import { PageHeader } from "@/components/page-header";

export default function SettingsPage() {
  return <><PageHeader eyebrow="MERCHANT / CONFIGURATION" title="Settings" action={false} /><form className="settingsForm"><label><span>Merchant display name</span><input defaultValue="StableFlow Studio" /></label><label><span>Settlement wallet</span><input defaultValue="0x2A9f4196d8E3E0f57D1CDaC39Ef31e81BeA38B20" /></label><label><span>Confirmation threshold</span><select defaultValue="12"><option value="6">6 blocks</option><option value="12">12 blocks</option><option value="20">20 blocks</option></select></label><button className="button primary" type="button">Save settings</button></form></>;
}
