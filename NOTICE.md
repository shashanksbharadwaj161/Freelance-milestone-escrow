# Third-party design references

StableFlow is an original implementation informed by these MIT-licensed repositories:

- `bleumi/solidity-payment-processor` — CREATE2 payment-address and per-order escrow concept. Copyright (c) 2022 Bleumi.
- `diorwave/Solidity-Contracts` (derived from `samnang/solidity-examples`) — Solidity testing and contract-pattern examples. Copyright (c) 2022 Samnang Chhun.
- `panaverse/defi-dapps-solidity-smart-contracts` — factory, withdrawal, access-restriction, and state-machine teaching examples. Copyright (c) 2021 Panacloud Multi-Cloud Internet-Scale Modern Global Apps.
- `elPoeta/blockchain-fullstack-app` — full-stack TypeScript application organization. Copyright (c) 2021 Leonardo Tosetto.

The repositories without an explicit root license were inspected for ideas only; their source code is not copied into this project.

StableFlow replaces the Bleumi reference contract's unrestricted settlement/refund entry points and does not reuse its raw minimal-proxy bytecode assembly.
