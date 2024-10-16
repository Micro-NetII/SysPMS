import { NextRequest, NextResponse } from "next/server";

import { generatePrismaClient } from "@/app/lib/utils";
import { cookies } from "next/headers";

export async function GET(request) {
  const tokenCookie = cookies().get("jwt");

  const prisma = generatePrismaClient();

  const response = await prisma.housekeepingRoomStatus.findMany();

  prisma.$disconnect();

  return new NextResponse(JSON.stringify({ response, status: 200 }));
}
