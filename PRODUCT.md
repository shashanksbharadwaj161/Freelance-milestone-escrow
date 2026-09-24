# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

StableFlow serves freelance clients and independent professionals who need to fund, deliver, approve, dispute, and release project work in stablecoin through explicit milestones.

## Product Purpose

Create project escrows with multiple milestones, hold a stablecoin budget, record delivery evidence, and release or refund each milestone under explicit rules. Success means both parties can understand who must act next and what the contract will allow.

## Positioning

Each milestone is an independent payment state machine: funded work can be submitted, approved, automatically released after review, disputed, or resolved with a partial split.

## Operating Context

Clients create and fund projects; freelancers submit delivery links and hashes; either party can open a dispute; a designated resolver can split a disputed milestone. Public project pages expose the payment history and printable receipts.

## Capabilities and Constraints

- Initial MVP supports ERC-20 stablecoin project escrows on one configurable EVM network.
- Milestone states include pending, funded, submitted, disputed, released, and refunded.
- Contract actions that move funds require explicit authorization and emit indexable events.
- Network, token allowlist, fee recipient, fee rate, contract addresses, and branding are environment-configurable.
- The initial local build uses synthetic demonstration records and must not imply a production deployment, audit, real customers, or processed volume.
- Base Sepolia is the working deployment target; production network selection remains open.
- Fiat conversion, custody, identity verification, and recurring billing are outside the initial MVP.

## Brand Commitments

StableFlow is a working product name, not yet user-confirmed. Product language is direct, calm, operational, and precise about whether a state is recorded locally, observed on-chain, or final.

## Evidence on Hand

The user supplied public reference repositories covering CREATE2 payment addresses, Solidity patterns, tests, and full-stack blockchain examples. No logo, customer evidence, pricing, production contract address, or commercial claims are available; future work must not fabricate them.

## Product Principles

1. Make payment state understandable before making it impressive.
2. Keep custody and settlement authority explicit.
3. Reconcile every on-chain event to one business object.
4. Default to stable values and low-surprise workflows.
5. Treat reference code as input, never as a security guarantee.

## Accessibility & Inclusion

Core checkout and dashboard workflows must be keyboard-accessible, retain visible focus, avoid color-only status communication, and remain usable on narrow mobile screens.
