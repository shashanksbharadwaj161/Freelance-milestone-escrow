"use client";
import { useMemo, useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { createEscrow, hashText, usdc } from "@/lib/wallet";
import type { Address } from "viem";

type Row = { title:string; amount:string; dueAt:string; criteria:string };
type Draft = { title:string; freelancer:Address; reviewDays:number; rows:Row[] };
const blank=():Row=>({title:"",amount:"",dueAt:"",criteria:""});

export function NewProjectForm(){
  const [rows,setRows]=useState<Row[]>([blank()]);
  const [state,setState]=useState<"idle"|"saving"|"ready"|"deploying"|"deployed"|"error">("idle");
  const [message,setMessage]=useState(""); const [draft,setDraft]=useState<Draft|null>(null);
  const total=useMemo(()=>rows.reduce((sum,row)=>sum+(Number(row.amount)||0),0),[rows]);
  const update=(index:number,key:keyof Row,value:string)=>setRows(current=>current.map((row,i)=>i===index?{...row,[key]:value}:row));
  async function validate(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setState("saving");const form=new FormData(e.currentTarget);
    const reviewDays=Number(form.get("reviewPeriodDays")); const freelancer=String(form.get("freelancerAddress")) as Address;
    const body={title:String(form.get("title")),freelancerAddress:freelancer,resolverAddress:form.get("resolverAddress"),reviewPeriodDays:reviewDays,milestones:rows.map(r=>({title:r.title,amount:r.amount,dueAt:new Date(r.dueAt).toISOString(),acceptanceCriteria:r.criteria}))};
    const response=await fetch("/api/projects",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
    if(!response.ok){setState("error");setMessage("Check every wallet address, amount, and due date.");return;}
    setDraft({title:body.title,freelancer,reviewDays,rows});setState("ready");setMessage("Draft validated. Deploy it with the connected client wallet.");
  }
  async function deploy(){
    if(!draft)return;const factory=process.env.NEXT_PUBLIC_FACTORY_ADDRESS as Address|undefined;const token=process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Address|undefined;
    if(!factory||!token){setMessage("Factory and token addresses are not configured yet. Add them after the testnet contracts are deployed.");return;}
    try{setState("deploying");const tx=await createEscrow(factory,[hashText(`${draft.title}|${Date.now()}`),draft.freelancer,token,BigInt(draft.reviewDays*86400),draft.rows.map(m=>usdc(m.amount)),draft.rows.map(m=>BigInt(Math.floor(new Date(m.dueAt).getTime()/1000)))]);setState("deployed");setMessage(`Project creation submitted: ${tx}`);}catch(error){setState("ready");setMessage(error instanceof Error?error.message:"Deployment cancelled.");}
  }
  return <form className="invoiceForm projectForm" onSubmit={validate}>
    <div className="formSection"><span className="formIndex">A</span><div><h2>Project parties</h2><p>The resolver acts only when either party opens a dispute.</p></div></div>
    <div className="fieldGrid"><label className="wide"><span>Project title</span><input name="title" required minLength={3}/></label><label><span>Freelancer wallet</span><input name="freelancerAddress" required pattern="^0x[a-fA-F0-9]{40}$" placeholder="0x…"/></label><label><span>Resolver wallet</span><input name="resolverAddress" required pattern="^0x[a-fA-F0-9]{40}$" placeholder="0x…"/></label></div>
    <div className="formSection"><span className="formIndex">B</span><div><h2>Milestones</h2><p>Add 1–20 independently releasable pieces of work.</p></div></div>
    <div className="milestoneEditor">{rows.map((row,index)=><fieldset key={index}><legend>Milestone {index+1}</legend><button type="button" aria-label={`Remove milestone ${index+1}`} disabled={rows.length===1} onClick={()=>setRows(current=>current.filter((_,i)=>i!==index))}><Trash2 size={15}/></button><label><span>Title</span><input required value={row.title} onChange={e=>update(index,"title",e.target.value)}/></label><label><span>Amount (USDC)</span><input required type="number" min="0.01" step="0.01" value={row.amount} onChange={e=>update(index,"amount",e.target.value)}/></label><label><span>Due date</span><input required type="datetime-local" value={row.dueAt} onChange={e=>update(index,"dueAt",e.target.value)}/></label><label className="wide"><span>Acceptance criteria</span><input required minLength={5} value={row.criteria} onChange={e=>update(index,"criteria",e.target.value)}/></label></fieldset>)}</div>
    <button type="button" className="button secondary" disabled={rows.length>=20} onClick={()=>setRows(current=>[...current,blank()])}><Plus size={16}/>Add milestone</button>
    <div className="formSection"><span className="formIndex">C</span><div><h2>Review rules</h2><p>Submitted work auto-releases when this window closes unless disputed.</p></div></div><label><span>Client review window</span><select name="reviewPeriodDays" defaultValue="3"><option value="3">3 days</option><option value="5">5 days</option><option value="7">7 days</option></select></label>
    <div className="registrationPreview"><span>PROJECT BUDGET</span><p>{total.toLocaleString(undefined,{minimumFractionDigits:2})} USDC · estimated commission {(total*.025).toLocaleString(undefined,{minimumFractionDigits:2})} USDC on full release</p><code>{rows.length} milestone{rows.length===1?"":"s"} · address available after deployment</code></div>
    {state!=="ready"&&state!=="deploying"&&state!=="deployed"&&<button className="button primary formSubmit" disabled={state==="saving"}>{state==="saving"?"Validating…":"Validate project"}</button>}
    {state==="ready"&&<button type="button" className="button primary formSubmit" onClick={deploy}><Check size={17}/>Deploy with wallet</button>}
    {state==="deploying"&&<button type="button" className="button primary formSubmit" disabled>Confirm in wallet…</button>}
    {message&&<p className={`formMessage ${state==="error"?"error":""}`} role="status">{message}</p>}
  </form>;
}
