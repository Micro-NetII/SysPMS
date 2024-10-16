import { NextRequest, NextResponse } from "next/server";
import {
  generatePrismaClient,
  getPropertyIDFromToken,
  getUserIDFromToken,
} from "@/app/lib/utils";
import { cookies } from "next/headers";

export async function GET(request) {
  const tokenCookie = cookies().get("jwt");

  const prisma = generatePrismaClient();

  const priceDescriptionSpecialPricesRecords =
    await prisma.priceDescriptionSpecialPrices.findMany();

  const response = priceDescriptionSpecialPricesRecords;

  prisma.$disconnect();

  return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {
  const tokenCookie = cookies().get("jwt");
  const prisma = generatePrismaClient();
  const userID = getUserIDFromToken(tokenCookie.value);

  try {
    const data = await request.json();

    const validFrom = new Date(data.validFrom);
    const validUntil = new Date(data.validUntil);

    const newRecord = await prisma.priceDescriptionSpecialPrices.create({
      data: {
        priceDescriptionHeaderID: parseInt(data.selectedHeaderIDNoFilter),
        validFrom: validFrom,
        validUntil: validUntil,
        roomID: parseInt(data.roomID),
        typologyID: parseInt(data.tipologyID),
        p1: parseFloat(data.p1),
        p2: parseFloat(data.p2),
        p3: parseFloat(data.p3),
        p4: parseFloat(data.p4),
        p5: parseFloat(data.p5),
        p6: parseFloat(data.p6),
        childPrice1: parseInt(data.childPrice1),
        childPrice2: parseInt(data.childPrice2),
        childPrice3: parseInt(data.childPrice3),
        childPrice4: parseInt(data.childPrice4),
        extraBedPrice: parseInt(data.extraBedPrice),
        forcedUpdate: parseInt(data.forcedUpdate),
        createdBy: userID,
      },
    });

    return new NextResponse(JSON.stringify({ newRecord, status: 200 }));
  } catch (error) {
    console.error("Erro ao processar a requisição:", error); // Adicione este log para depuração
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
