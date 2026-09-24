import { NextResponse } from "next/server";
import { z } from "zod";
import { projects } from "@/lib/projects";

const projectInput = z.object({
  title: z.string().min(3).max(120),
  freelancerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  resolverAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  reviewPeriodDays: z.number().int().min(1).max(30),
  milestones: z.array(z.object({ title: z.string().min(2), amount: z.string().regex(/^\d+(\.\d{1,6})?$/), dueAt: z.iso.datetime() })).min(1).max(20),
});

export async function GET() { return NextResponse.json({ data: projects, source: "demonstration" }); }

export async function POST(request: Request) {
  const parsed = projectInput.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid project", fields: z.flattenError(parsed.error).fieldErrors }, { status: 422 });
  return NextResponse.json({ data: { id: crypto.randomUUID(), status: "draft", ...parsed.data }, nextAction: "deploy-escrow-with-wallet" }, { status: 201 });
}
