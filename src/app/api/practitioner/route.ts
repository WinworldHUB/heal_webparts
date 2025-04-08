// /api/practitioner/route.ts
import { DUMMY_PRACTITIONERS } from "@/lib/data/dummy-practitioner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const practitionerId = searchParams.get("practitionerId");
  const therapyId = searchParams.get("therapyId");

  let filtered = DUMMY_PRACTITIONERS;

  if (practitionerId) {
    filtered = filtered.filter(p => p.id === practitionerId);
  }

  if (therapyId) {
    filtered = filtered.filter(p =>
      p.therapies.some(t => t.id === therapyId)
    );
  }

  return NextResponse.json(filtered);
}
