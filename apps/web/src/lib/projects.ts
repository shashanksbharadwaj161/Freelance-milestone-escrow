export type MilestoneState = "pending" | "funded" | "submitted" | "disputed" | "released" | "refunded";
export type Project = { id: string; code: string; title: string; counterparty: string; role: "Client" | "Freelancer"; budget: string; released: string; token: string; nextAction: string; escrowAddress?: `0x${string}`; milestones: { title: string; amount: string; state: MilestoneState; due: string; submittedAt?: string; reviewEndsAt?: string; deliveryUri?: string }[] };

export const projects: Project[] = [
  { id: "brand-system", code: "PRJ-1048", title: "Northstar brand system", counterparty: "Maya Chen", role: "Client", budget: "6,800.00", released: "2,000.00", token: "USDC", nextAction: "Review delivery", milestones: [
    { title: "Research and direction", amount: "2,000.00", state: "released", due: "Sep 16" },
    { title: "Identity system", amount: "3,200.00", state: "submitted", due: "Sep 26", submittedAt: "Sep 24 · 12:18 UTC", reviewEndsAt: "Sep 27 · 12:18 UTC", deliveryUri: "ipfs://bafy…91af" },
    { title: "Production handoff", amount: "1,600.00", state: "funded", due: "Oct 04" }
  ]},
  { id: "commerce-build", code: "PRJ-1047", title: "Aperture commerce build", counterparty: "Aperture Goods", role: "Freelancer", budget: "9,500.00", released: "4,000.00", token: "USDC", nextAction: "Submit delivery", milestones: [
    { title: "Architecture", amount: "4,000.00", state: "released", due: "Sep 10" },
    { title: "Storefront", amount: "3,500.00", state: "funded", due: "Sep 28" },
    { title: "Launch support", amount: "2,000.00", state: "pending", due: "Oct 12" }
  ]},
  { id: "protocol-integration", code: "PRJ-1046", title: "Protocol integration", counterparty: "Juniper Labs", role: "Freelancer", budget: "12,000.00", released: "3,000.00", token: "USDC", nextAction: "Dispute in review", milestones: [
    { title: "Specification", amount: "3,000.00", state: "released", due: "Sep 08" },
    { title: "Implementation", amount: "6,000.00", state: "disputed", due: "Sep 22" },
    { title: "Audit fixes", amount: "3,000.00", state: "pending", due: "Oct 10" }
  ]}
];
