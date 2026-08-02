import { NextResponse } from "next/server";
import { registrationCampusOptions } from "@/lib/campuses";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    campuses: registrationCampusOptions.map((campus) => ({
      slug: campus.slug,
      name: campus.name,
      address: campus.address,
      label: campus.name,
    })),
  });
}
