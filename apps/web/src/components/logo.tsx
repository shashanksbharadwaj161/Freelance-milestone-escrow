import Link from "next/link";

export function Logo() {
  return (
    <Link href="/dashboard" className="brand" aria-label="StableFlow dashboard">
      <span className="brandMark" aria-hidden="true"><i /><i /><i /></span>
      <span>StableFlow</span>
    </Link>
  );
}
