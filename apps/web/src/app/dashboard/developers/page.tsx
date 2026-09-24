import { PageHeader } from "@/components/page-header";

const example = 'POST /api/invoices\nContent-Type: application/json\n\n{\n  "reference": "INV-1049",\n  "amount": "250.00",\n  "token": "USDC"\n}';

export default function DevelopersPage() {
  return <><PageHeader eyebrow="MERCHANT / INTEGRATION" title="Developers" action={false} /><section className="developerGrid"><div><span>API ORIGIN</span><code>https://your-domain.example/api</code><p>The production hostname will be available after deployment.</p></div><div><span>WEBHOOK EVENTS</span><ul><li>invoice.payment_detected</li><li>invoice.payment_confirmed</li><li>invoice.settled</li><li>invoice.refunded</li></ul></div><div className="wide"><span>CREATE AN INVOICE</span><pre><code>{example}</code></pre></div></section></>;
}
