// Fetch Practitioner by ID

import { DUMMY_PRACTITIONERS } from "@/lib/data/dummy-practitioner";
import { NextResponse } from "next/server";

// GET /api/practitioner/:id
export async function GET(_request: Request, { params }: { params: any }) {
  const param = await params;
  const paramId = param.id;
  const practitioner = DUMMY_PRACTITIONERS.find((p) => p.id === paramId);

  if (!practitioner) {
    return NextResponse.json(
      { error: "Practitioner not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(practitioner);
}
