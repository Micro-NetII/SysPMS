import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {
  generatePrismaClient,
  getPropertyIDFromToken,
  getUserIDFromToken,
} from "@/app/lib/utils";
import { cookies } from "next/headers";

export async function GET(request, context) {
  const prisma = generatePrismaClient();

  const { id } = context.params;

  const response = await prisma.ageConfig.findUnique({
    where: {
      ageConfigID: parseInt(id),
    },
  });

  if (!response) {
    return new NextResponse(JSON.stringify({ status: 404 }));
  }

  prisma.$disconnect();

  return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PATCH(request, context) {
  const tokenCookie = cookies().get("jwt");

  const prisma = generatePrismaClient();

  const userID = getUserIDFromToken(tokenCookie.value);

  try {
    const { id } = context.params;
    const { data } = await request.json();

    const updateRecord = await prisma.ageConfig.update({
      where: {
        ageConfigID: parseInt(id),
      },
      data: {
        ageConfigFieldDescription: data.ageConfigFieldDescription,
      },
    });
    return new NextResponse(JSON.stringify({ status: 200 }));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
