// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title MilestoneEscrow
/// @notice Holds a project's stablecoins and releases them milestone by milestone.
contract MilestoneEscrow is ReentrancyGuard {
    using SafeERC20 for IERC20;

    enum Status { Pending, Funded, Submitted, Disputed, Released, Refunded }
    struct Milestone {
        uint128 amount;
        uint64 dueAt;
        uint64 submittedAt;
        Status status;
        bytes32 deliveryHash;
        string deliveryUri;
    }

    bytes32 public immutable projectId;
    address public immutable client;
    address public immutable freelancer;
    address public immutable resolver;
    IERC20 public immutable token;
    address public immutable treasury;
    uint16 public immutable feeBps;
    uint64 public immutable reviewPeriod;
    uint256 public immutable totalBudget;
    uint256 public fundedAmount;
    uint256 public releasedAmount;
    uint256 public refundedAmount;
    Milestone[] private _milestones;

    error Unauthorized();
    error InvalidState();
    error InvalidConfiguration();
    error ReviewPeriodActive();
    error NotFullyFunded();

    event ProjectFunded(bytes32 indexed projectId, address indexed funder, uint256 amount, uint256 totalFunded);
    event DeliverySubmitted(bytes32 indexed projectId, uint256 indexed milestoneId, bytes32 deliveryHash, string deliveryUri, uint64 reviewEndsAt);
    event MilestoneApproved(bytes32 indexed projectId, uint256 indexed milestoneId, address indexed approvedBy);
    event MilestoneReleased(bytes32 indexed projectId, uint256 indexed milestoneId, uint256 grossAmount, uint256 feeAmount);
    event DisputeOpened(bytes32 indexed projectId, uint256 indexed milestoneId, address indexed openedBy, bytes32 reasonHash);
    event DisputeResolved(bytes32 indexed projectId, uint256 indexed milestoneId, uint256 freelancerAmount, uint256 clientRefund);
    event MilestoneRefunded(bytes32 indexed projectId, uint256 indexed milestoneId, uint256 amount);

    constructor(
        bytes32 projectId_, address client_, address freelancer_, address resolver_, address token_,
        address treasury_, uint16 feeBps_, uint64 reviewPeriod_, uint128[] memory amounts_, uint64[] memory dueDates_
    ) {
        if (client_ == address(0) || freelancer_ == address(0) || resolver_ == address(0) || token_ == address(0) || treasury_ == address(0)) revert InvalidConfiguration();
        if (amounts_.length == 0 || amounts_.length != dueDates_.length || reviewPeriod_ < 1 days || feeBps_ > 1_000) revert InvalidConfiguration();
        projectId = projectId_; client = client_; freelancer = freelancer_; resolver = resolver_;
        token = IERC20(token_); treasury = treasury_; feeBps = feeBps_; reviewPeriod = reviewPeriod_;
        uint256 budget;
        for (uint256 i; i < amounts_.length; ++i) {
            if (amounts_[i] == 0 || dueDates_[i] <= block.timestamp) revert InvalidConfiguration();
            _milestones.push(Milestone(amounts_[i], dueDates_[i], 0, Status.Pending, bytes32(0), ""));
            budget += amounts_[i];
        }
        totalBudget = budget;
    }

    modifier onlyClient() { if (msg.sender != client) revert Unauthorized(); _; }
    modifier onlyFreelancer() { if (msg.sender != freelancer) revert Unauthorized(); _; }

    function milestoneCount() external view returns (uint256) { return _milestones.length; }
    function milestone(uint256 id) external view returns (Milestone memory) { return _milestones[id]; }

    function fund(uint256 amount) external nonReentrant {
        if (amount == 0 || fundedAmount + amount > totalBudget) revert InvalidConfiguration();
        fundedAmount += amount;
        token.safeTransferFrom(msg.sender, address(this), amount);
        emit ProjectFunded(projectId, msg.sender, amount, fundedAmount);
        if (fundedAmount == totalBudget) {
            for (uint256 i; i < _milestones.length; ++i) _milestones[i].status = Status.Funded;
        }
    }

    function submitDelivery(uint256 id, bytes32 deliveryHash, string calldata deliveryUri) external onlyFreelancer {
        if (fundedAmount != totalBudget) revert NotFullyFunded();
        Milestone storage item = _milestones[id];
        if (item.status != Status.Funded || deliveryHash == bytes32(0)) revert InvalidState();
        item.status = Status.Submitted; item.submittedAt = uint64(block.timestamp);
        item.deliveryHash = deliveryHash; item.deliveryUri = deliveryUri;
        emit DeliverySubmitted(projectId, id, deliveryHash, deliveryUri, uint64(block.timestamp) + reviewPeriod);
    }

    function approve(uint256 id) external onlyClient nonReentrant {
        Milestone storage item = _milestones[id];
        if (item.status != Status.Submitted) revert InvalidState();
        emit MilestoneApproved(projectId, id, msg.sender);
        _release(id, item);
    }

    function autoRelease(uint256 id) external nonReentrant {
        Milestone storage item = _milestones[id];
        if (item.status != Status.Submitted) revert InvalidState();
        if (block.timestamp < uint256(item.submittedAt) + reviewPeriod) revert ReviewPeriodActive();
        emit MilestoneApproved(projectId, id, msg.sender);
        _release(id, item);
    }

    function openDispute(uint256 id, bytes32 reasonHash) external {
        if (msg.sender != client && msg.sender != freelancer) revert Unauthorized();
        Milestone storage item = _milestones[id];
        if (item.status != Status.Submitted) revert InvalidState();
        item.status = Status.Disputed;
        emit DisputeOpened(projectId, id, msg.sender, reasonHash);
    }

    /// @notice Resolver splits a disputed milestone; the remainder returns to the client.
    function resolveDispute(uint256 id, uint128 freelancerShare) external nonReentrant {
        if (msg.sender != resolver) revert Unauthorized();
        Milestone storage item = _milestones[id];
        if (item.status != Status.Disputed || freelancerShare > item.amount) revert InvalidState();
        item.status = freelancerShare == 0 ? Status.Refunded : Status.Released;
        uint256 refund = item.amount - freelancerShare;
        if (freelancerShare != 0) _payFreelancer(freelancerShare);
        if (refund != 0) { refundedAmount += refund; token.safeTransfer(client, refund); }
        emit DisputeResolved(projectId, id, freelancerShare, refund);
    }

    /// @notice Client may reclaim an unsubmitted milestone only after its due date.
    function refundOverdue(uint256 id) external onlyClient nonReentrant {
        Milestone storage item = _milestones[id];
        if (item.status != Status.Funded || block.timestamp <= item.dueAt) revert InvalidState();
        item.status = Status.Refunded; refundedAmount += item.amount;
        token.safeTransfer(client, item.amount);
        emit MilestoneRefunded(projectId, id, item.amount);
    }

    function _release(uint256 id, Milestone storage item) internal {
        item.status = Status.Released;
        uint256 fee = _payFreelancer(item.amount);
        emit MilestoneReleased(projectId, id, item.amount, fee);
    }

    function _payFreelancer(uint256 gross) internal returns (uint256 fee) {
        fee = (gross * feeBps) / 10_000;
        releasedAmount += gross;
        if (fee != 0) token.safeTransfer(treasury, fee);
        token.safeTransfer(freelancer, gross - fee);
    }
}
