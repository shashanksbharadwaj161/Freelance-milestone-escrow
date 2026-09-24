import { AlertTriangle, Check, Clock3, CircleDot, RotateCcw, X } from "lucide-react";
type InvoiceStatus = "draft" | "open" | "underpaid" | "paid" | "settled" | "refunded" | "expired" | "cancelled";

const icons = {
  draft: Clock3, open: CircleDot, underpaid: AlertTriangle, paid: Check,
  settled: Check, refunded: RotateCcw, expired: Clock3, cancelled: X,
};

export function StatusStamp({ status }: { status: InvoiceStatus }) {
  const Icon = icons[status];
  return <span className="statusStamp" data-status={status}><Icon size={13} aria-hidden="true" />{status}</span>;
}
