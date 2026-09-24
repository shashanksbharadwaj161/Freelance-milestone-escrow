import { PageHeader } from "@/components/page-header";
import { ProjectTable } from "@/components/project-table";
import { projects } from "@/lib/projects";
export default function ProjectsPage() { return <><PageHeader eyebrow="ESCROW / PROJECT REGISTER" title="Projects" /><div className="filterRail"><button aria-pressed="true">All <b>3</b></button><button>As client <b>1</b></button><button>As freelancer <b>2</b></button><button>Needs action <b>2</b></button></div><ProjectTable rows={projects} /></>; }
