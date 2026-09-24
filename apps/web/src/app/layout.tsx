import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "StableFlow", template: "%s · StableFlow" },
  description: "Stablecoin milestone escrow for clients and freelancers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
