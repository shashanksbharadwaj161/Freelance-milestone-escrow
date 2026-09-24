import Link from "next/link";
import { BriefcaseBusiness, CircleHelp, LayoutDashboard, RadioTower, Scale, Settings, WalletCards } from "lucide-react";
import { Logo } from "./logo";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/dashboard/settlements", label: "Payouts", icon: WalletCards },
  { href: "/dashboard/disputes", label: "Disputes", icon: Scale },
  { href: "/dashboard/developers", label: "Developers", icon: RadioTower },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ active = "Overview" }: { active?: string }) {
  return (
    <aside className="sidebar">
      <Logo />
      <nav aria-label="Merchant navigation">
        <p className="navLabel">CLEARING DESK</p>
        {nav.map(({ href, label, icon: Icon }) => (
          <Link key={label} href={href} className="navItem" aria-label={label} aria-current={active === label ? "page" : undefined}>
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
            {label === "Projects" && <small>3</small>}
          </Link>
        ))}
      </nav>
      <div className="sidebarBottom">
        <Link href="/dashboard/settings" className="navItem"><Settings size={18} />Settings</Link>
        <Link href="/docs" className="navItem"><CircleHelp size={18} />Help & docs</Link>
        <div className="networkSlip">
          <span className="liveDot" />
          <div><strong>BASE SEPOLIA</strong><small>Test network</small></div>
        </div>
      </div>
    </aside>
  );
}
