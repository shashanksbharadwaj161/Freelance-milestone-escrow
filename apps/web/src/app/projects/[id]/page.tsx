import { notFound } from "next/navigation";
import { Logo } from "@/components/logo";
import { ProjectActions } from "@/components/project-actions";
import { projects } from "@/lib/projects";

export default async function ProjectPage({ params }: { params: Promise<{id:string}> }) {
  const { id } = await params;
  const project = projects.find(item => item.id === id);
  if (!project) notFound();
  const submitted = project.milestones.find(m => m.submittedAt);
  return <main className="publicProject">
    <header className="checkoutHeader"><Logo/><span>DEMONSTRATION RECORD · NOT DEPLOYED</span></header>
    <aside className="demoBanner">Illustrative Base Sepolia data. Contract actions activate when this record has a deployed escrow address.</aside>
    <section className="projectHero">
      <p className="registration">{project.code} / ESCROW PREVIEW</p><h1>{project.title}</h1>
      <div className="projectParties"><div><span>CLIENT</span><strong>{project.role === "Client" ? "You" : project.counterparty}</strong></div><i>↔</i><div><span>FREELANCER</span><strong>{project.role === "Freelancer" ? "You" : project.counterparty}</strong></div></div>
      <dl><div><dt>TOTAL BUDGET</dt><dd>{project.budget} {project.token}</dd></div><div><dt>RELEASED</dt><dd>{project.released} {project.token}</dd></div><div><dt>PLATFORM FEE</dt><dd>2.5% on release</dd></div></dl>
    </section>
    <section className="milestoneLedger"><div className="sectionHeading"><div><h2>Milestone register</h2><p>Actions are scoped by role and contract state.</p></div></div>
      {project.milestones.map((m,index)=><article key={m.title} data-state={m.state}>
        <div className="milestoneNumber">{String(index+1).padStart(2,"0")}</div>
        <div><span>{m.state}</span><h3>{m.title}</h3><p>Due {m.due}{m.submittedAt ? ` · Submitted ${m.submittedAt}` : ""}</p>{m.deliveryUri && <code>{m.deliveryUri}</code>}</div>
        <strong>{m.amount} <small>{project.token}</small></strong>
        <ProjectActions projectCode={project.code} projectTitle={project.title} milestone={m.title} milestoneId={index} amount={m.amount} token={project.token} state={m.state} role={project.role} reviewEndsAt={m.reviewEndsAt} escrowAddress={project.escrowAddress}/>
      </article>)}
    </section>
    <section className="receiptBlock"><span>ILLUSTRATIVE EVENT HISTORY · {project.code}</span><ol>
      <li><time>SEP 08 · 14:02 UTC</time><b>Project funded</b><code>demo:{project.id}:funded</code></li>
      <li><time>SEP 16 · 09:44 UTC</time><b>Milestone 1 released</b><code>demo:{project.id}:release-1</code></li>
      {submitted && <li><time>{submitted.submittedAt}</time><b>Delivery submitted</b><code>{submitted.deliveryUri}</code></li>}
    </ol></section>
  </main>;
}
