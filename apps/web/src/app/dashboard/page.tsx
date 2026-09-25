import { ArrowRight, Check, CircleDollarSign, Clock3, Scale, Send } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ProjectTable } from "@/components/project-table";
import { projects } from "@/lib/projects";

export default function DashboardPage() {
  return <>
    <PageHeader eyebrow="Escrow overview" title="Money moves when the work does." />
    <section className="clearingStrip" aria-label="Escrow summary">
      <div className="totalBlock">
        <span className="metricLabel">Protected across active projects</span>
        <strong><small>$</small>19,300<span>.00</span></strong>
        <p><b>3 project escrows</b> are protecting 9 independent milestones.</p>
      </div>
      <div className="checkpointBlock">
        <p className="traceLabel"><span /> Live milestone flow</p>
        <div className="traceLine" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <dl className="checkpointStats">
          <div><dt>Needs review</dt><dd>2</dd></div>
          <div><dt>In resolution</dt><dd>1</dd></div>
          <div><dt>Released</dt><dd>3</dd></div>
        </dl>
      </div>
    </section>
    <section className="stateRail" aria-label="Milestone states">
      <div><Clock3 /><span>Funded</span><strong>2</strong><small>$5,500 ready for work</small></div>
      <div><Send /><span>Submitted</span><strong>1</strong><small>Review due in 2 days</small></div>
      <div><Scale /><span>Disputed</span><strong>1</strong><small>$6,000 with resolver</small></div>
      <div><CircleDollarSign /><span>Released</span><strong>3</strong><small>$9,000 paid out</small></div>
    </section>
    <section className="sectionBlock">
      <div className="sectionHeading"><div><h2>Active projects</h2><p>Each project is protected by its own milestone escrow.</p></div><Link href="/dashboard/projects">See all <ArrowRight size={16} /></Link></div>
      <ProjectTable rows={projects} />
    </section>
    <section className="activitySection">
      <div className="activityTitle"><Check size={19} /><div><h2>Up next</h2><p>Decisions that keep funds moving</p></div></div>
      <ol className="activityLog">
        <li data-tone="warning"><time>Today</time><i /><div><strong>Review “Identity system”</strong><span>Approve, dispute, or allow automatic release in 2 days.</span></div></li>
        <li><time>Sep 28</time><i /><div><strong>Submit “Storefront”</strong><span>Attach a delivery URL and immutable content hash.</span></div></li>
        <li data-tone="warning"><time>Open</time><i /><div><strong>Implementation dispute</strong><span>Waiting for the designated resolver.</span></div></li>
      </ol>
    </section>
  </>;
}
