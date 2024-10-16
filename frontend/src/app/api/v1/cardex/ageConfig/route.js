import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {
  generatePrismaClient,
  getPropertyIDFromToken,
  getUserIDFromToken,
} from "@/app/lib/utils";
import { cookies } from "next/headers";

export async function GET(request) {
  const prisma = generatePrismaClient();

  const response = await prisma.ageConfig.findMany();

  prisma.$disconnect();

  return new NextResponse(JSON.stringify({ response, status: 200 }));
}
