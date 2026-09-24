"use client";
import { useState } from "react";
import { Check, Download, Scale, Send, X } from "lucide-react";
import type { MilestoneState } from "@/lib/projects";
import { hashText, sendEscrow } from "@/lib/wallet";

type Props = { projectCode: string; projectTitle: string; milestone: string; milestoneId:number; amount: string; token: string; state: MilestoneState; role: "Client" | "Freelancer"; reviewEndsAt?: string; escrowAddress?: `0x${string}` };

export function ProjectActions(props: Props) {
  const [panel, setPanel] = useState<"delivery"|"dispute"|null>(null); const [message,setMessage]=useState("");
  function downloadReceipt() { const receipt = ["STABLEFLOW ESCROW RECEIPT",`Project: ${props.projectCode} — ${props.projectTitle}`,`Milestone: ${props.milestone}`,`Gross: ${props.amount} ${props.token}`,"Commission: 2.5% when released",`State: ${props.state}`,"Network: Base Sepolia demonstration",`Generated: ${new Date().toISOString()}`].join("\n"); const url=URL.createObjectURL(new Blob([receipt],{type:"text/plain"})); const a=document.createElement("a"); a.href=url;a.download=`${props.projectCode}-${props.milestone.replaceAll(" ","-").toLowerCase()}-receipt.txt`;a.click();URL.revokeObjectURL(url); }
  return <div className="milestoneActions">
    {props.state === "submitted" && props.role === "Client" && <><button className="button primary" onClick={async()=>{if(!props.escrowAddress){setMessage("Demo only: deploy the project to enable approval.");return;}try{const hash=await sendEscrow(props.escrowAddress,"approve",[BigInt(props.milestoneId)]);setMessage(`Approval submitted: ${hash}`);}catch(error){setMessage(error instanceof Error?error.message:"Approval cancelled.");}}}><Check size={15}/>Approve</button><button className="button secondary" onClick={()=>setPanel("dispute")}><Scale size={15}/>Dispute</button></>}
    {props.state === "funded" && props.role === "Freelancer" && <button className="button primary" onClick={()=>setPanel("delivery")}><Send size={15}/>Submit work</button>}
    {(props.state === "released" || props.state === "refunded") && <button className="button secondary" onClick={downloadReceipt}><Download size={15}/>Receipt</button>}
    {props.state === "submitted" && <small>Auto-release: {props.reviewEndsAt}</small>}
    {panel && <form className="inlineAction" onSubmit={async(e)=>{e.preventDefault();const form=new FormData(e.currentTarget);if(!props.escrowAddress){setPanel(null);setMessage("Inputs validated. Deploy the project to enable the wallet transaction.");return;}try{const hash=panel==="delivery"?await sendEscrow(props.escrowAddress,"submitDelivery",[BigInt(props.milestoneId),form.get("contentHash"),form.get("deliveryUri")]):await sendEscrow(props.escrowAddress,"openDispute",[BigInt(props.milestoneId),hashText(`${form.get("reason")}|${form.get("evidenceUri")}`)]);setPanel(null);setMessage(`Transaction submitted: ${hash}`);}catch(error){setMessage(error instanceof Error?error.message:"Transaction cancelled.");}}}><button type="button" className="closeAction" onClick={()=>setPanel(null)} aria-label="Close"><X size={15}/></button>{panel === "delivery" ? <><label><span>Delivery URL</span><input name="deliveryUri" type="text" required placeholder="https:// or ipfs://"/></label><label><span>Content hash</span><input name="contentHash" required pattern="^0x[a-fA-F0-9]{64}$" placeholder="0x… 32-byte hash"/></label></> : <><label><span>Reason</span><input name="reason" required minLength={10} placeholder="Describe the contract or scope issue"/></label><label><span>Evidence URL</span><input name="evidenceUri" type="text" required placeholder="https:// or ipfs://"/></label></>}<button className="button primary">Submit {panel}</button></form>}
    {message && <p role="status">{message}</p>}
  </div>;
}
