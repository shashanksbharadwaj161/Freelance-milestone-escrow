"use client";

import Link from "next/link";
import { BriefcaseBusiness, CircleHelp, LayoutDashboard, RadioTower, Scale, Settings, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/dashboard/settlements", label: "Payouts", icon: WalletCards },
  { href: "/dashboard/disputes", label: "Disputes", icon: Scale },
  { href: "/dashboard/developers", label: "Developers", icon: RadioTower },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <header className="sidebar">
      <div className="navFrame">
        <Logo />
        <nav aria-label="Merchant navigation">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={label} href={href} className="navItem" aria-label={label} aria-current={pathname === href || (href !== "/dashboard" && pathname.startsWith(href)) ? "page" : undefined}>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
              {label === "Projects" && <small>3</small>}
            </Link>
          ))}
        </nav>
        <div className="sidebarBottom">
          <Link href="/docs" className="navUtility" aria-label="Help and documentation"><CircleHelp size={18} /><span>Help</span></Link>
          <div className="networkSlip">
            <span className="liveDot" />
            <div><strong>Base Sepolia</strong><small>Demo network</small></div>
          </div>
        </div>
      </div>
    </header>
  );
}
