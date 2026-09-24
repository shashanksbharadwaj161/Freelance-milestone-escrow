# StableFlow Milestone Escrow

A full-stack stablecoin escrow for freelance projects. Clients fund multiple milestones; freelancers submit delivery evidence; clients approve releases or open disputes; missed review deadlines can release automatically; resolvers can split disputed funds between payout and partial refund.

## Included

- Solidity `EscrowFactory` project registry
- One `MilestoneEscrow` contract per project
- Multi-milestone USDC-style funding
- Delivery URL and content-hash submissions
- Client approval and permissionless timed release
- Dispute opening and resolver-controlled split decisions
- Overdue unsubmitted milestone refunds
- Platform commission on freelancer payouts
- Contract events supporting public histories and receipts
- Responsive Next.js dashboard and public project pages
- PostgreSQL schema foundation and JSON API routes

## Run locally

```bash
cp .env.example .env.local
npm install
npm test
npm run dev
```

Open `http://localhost:3000`. The interface uses clearly labelled demonstration data until contracts and a database are configured.

## Contracts

```bash
npm run contracts:compile
npm test
```

For deployment, supply `DEPLOYER_PRIVATE_KEY`, `TREASURY_ADDRESS`, `RESOLVER_ADDRESS`, and `PLATFORM_FEE_BPS` through a secure deployment environment. Never commit keys.

## Production gates

The repository is an MVP, not an audited financial product. Before mainnet use: commission an independent audit, test supported tokens, add authenticated API access, run a durable chain indexer, configure a production PostgreSQL database, define resolver governance, and obtain relevant legal/compliance advice.

See [NOTICE.md](./NOTICE.md) for reference-project attribution.
