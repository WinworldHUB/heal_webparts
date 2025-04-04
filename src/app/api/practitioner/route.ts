// Fetch all practitioners

import { DUMMY_PRACTITIONERS } from "@/lib/data/dummy-practitioner";
import { NextResponse } from "next/server";

// GET /api/practitioner
export async function GET() {
    return NextResponse.json(DUMMY_PRACTITIONERS);
  }
