import { Bell, Plus } from "lucide-react";
import Link from "next/link";

export function PageHeader({ title, eyebrow, action = true }: { title: string; eyebrow: string; action?: boolean }) {
  return (
    <header className="pageHeader">
      <div>
        <p className="registration">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      <div className="headerActions">
        <button className="iconButton" aria-label="Notifications"><Bell size={19} /><span className="notificationDot" /></button>
        {action && <Link href="/dashboard/projects/new" className="button primary"><Plus size={17} />New project</Link>}
      </div>
    </header>
  );
}
