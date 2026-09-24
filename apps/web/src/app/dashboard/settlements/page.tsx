import { PageHeader } from "@/components/page-header";
import { StatusStamp } from "@/components/status-stamp";

export default function SettlementsPage() {
  return <><PageHeader eyebrow="MERCHANT / CLEARING" title="Settlements" action={false} /><section className="placeholderSurface"><div><span>AVAILABLE TO SETTLE</span><strong>4,180.00 <small>USDC</small></strong><p>Across two paid invoice vaults on Base Sepolia.</p></div><button className="button primary" disabled>Connect merchant wallet</button></section><div className="manifest"><div className="manifestHead"><span>REFERENCE</span><span>GROSS</span><span>FEE</span><span>STATE</span><span /></div><div className="manifestRow"><div className="invoiceIdentity"><b>INV-1048</b><span>Northstar Studio</span></div><div>2,480.00 USDC</div><div>12.40 USDC</div><StatusStamp status="paid" /><span /></div></div></>;
}
