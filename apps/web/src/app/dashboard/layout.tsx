import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="appShell"><Sidebar /><main className="mainPanel">{children}</main></div>;
}
