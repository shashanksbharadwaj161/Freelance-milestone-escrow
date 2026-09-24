"use client";
import { useMemo, useState } from "react";

export function DisputeResolution() {
  const gross=6000, feeRate=.025; const [freelancer,setFreelancer]=useState(4000); const [resolved,setResolved]=useState(false);
  const values=useMemo(()=>({refund:gross-freelancer,fee:freelancer*feeRate,net:freelancer*(1-feeRate)}),[freelancer]);
  return <section className="resolutionPanel"><div><span>RESOLVER SPLIT</span><h2>{freelancer.toLocaleString()} / {values.refund.toLocaleString()}</h2><p>Freelancer gross / client partial refund</p></div><label><span>Freelancer award (USDC)</span><input type="range" min="0" max={gross} step="100" value={freelancer} onChange={e=>{setFreelancer(Number(e.target.value));setResolved(false);}}/><output>{freelancer.toLocaleString()} USDC</output></label><dl><div><dt>Platform fee</dt><dd>{values.fee.toLocaleString()} USDC</dd></div><div><dt>Freelancer receives</dt><dd>{values.net.toLocaleString()} USDC</dd></div><div><dt>Client refunded</dt><dd>{values.refund.toLocaleString()} USDC</dd></div><div><dt>Total allocated</dt><dd>{(freelancer+values.refund).toLocaleString()} USDC</dd></div></dl><button className="button primary" disabled={resolved} onClick={()=>setResolved(true)}>{resolved?"Resolution prepared":"Prepare resolution"}</button>{resolved&&<p role="status">Split validated. Connect the designated resolver wallet to broadcast resolveDispute().</p>}</section>;
}
