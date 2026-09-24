// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {MilestoneEscrow} from "./MilestoneEscrow.sol";

contract EscrowFactory is Ownable {
    address public treasury;
    address public resolver;
    uint16 public feeBps;
    mapping(bytes32 => address) public projects;
    address[] public allProjects;

    error InvalidConfiguration();
    error ProjectExists();
    event ProjectCreated(bytes32 indexed projectId, address indexed escrow, address indexed client, address freelancer, uint256 budget);
    event ConfigurationUpdated(address treasury, address resolver, uint16 feeBps);

    constructor(address owner_, address treasury_, address resolver_, uint16 feeBps_) Ownable(owner_) {
        _configure(treasury_, resolver_, feeBps_);
    }

    function createProject(
        bytes32 projectId, address freelancer, address token, uint64 reviewPeriod,
        uint128[] calldata amounts, uint64[] calldata dueDates
    ) external returns (address escrow) {
        if (projects[projectId] != address(0)) revert ProjectExists();
        MilestoneEscrow deployed = new MilestoneEscrow{salt: keccak256(abi.encode(msg.sender, projectId))}(
            projectId, msg.sender, freelancer, resolver, token, treasury, feeBps, reviewPeriod, amounts, dueDates
        );
        escrow = address(deployed); projects[projectId] = escrow; allProjects.push(escrow);
        uint256 budget; for (uint256 i; i < amounts.length; ++i) budget += amounts[i];
        emit ProjectCreated(projectId, escrow, msg.sender, freelancer, budget);
    }

    function projectCount() external view returns (uint256) { return allProjects.length; }
    function configure(address treasury_, address resolver_, uint16 feeBps_) external onlyOwner { _configure(treasury_, resolver_, feeBps_); }
    function _configure(address treasury_, address resolver_, uint16 feeBps_) internal {
        if (treasury_ == address(0) || resolver_ == address(0) || feeBps_ > 1_000) revert InvalidConfiguration();
        treasury = treasury_; resolver = resolver_; feeBps = feeBps_;
        emit ConfigurationUpdated(treasury_, resolver_, feeBps_);
    }
}
