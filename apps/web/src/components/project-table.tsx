import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectTable({ rows }: { rows: Project[] }) {
  return (
    <div className="manifest">
      <div className="manifestHead">
        <span>PROJECT / COUNTERPARTY</span>
        <span>ROLE</span>
        <span>BUDGET</span>
        <span>NEXT ACTION</span>
        <span />
      </div>
      {rows.map((project) => (
        <div className="manifestRow" key={project.id}>
          <div className="invoiceIdentity">
            <Link href={`/projects/${project.id}`}>{project.code}</Link>
            <span>{project.title} · {project.counterparty}</span>
          </div>
          <div>{project.role}</div>
          <div className="amount">
            <strong>{project.budget}</strong>
            <span>{project.token}</span>
          </div>
          <span
            className="statusStamp"
            data-status={project.nextAction.includes("Dispute") ? "underpaid" : project.nextAction.includes("Review") ? "paid" : "open"}
          >
            {project.nextAction}
          </span>
          <div className="rowActions">
            <Link href={`/projects/${project.id}`} aria-label={`Open ${project.title}`}>
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
