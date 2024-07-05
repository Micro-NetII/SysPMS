import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const propertyID = getPropertyIDFromToken(tokenCookie.value)

    const response = await prisma.revenueAccounts.findMany({
        where: {
            propertyID: propertyID
        }
    })

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)

    const propertyID = getPropertyIDFromToken(tokenCookie.value)

    try {
        const { data } = await request.json();
        console.log(data)
        const newRecord = await prisma.revenueAccounts.create({
            data: {
                name: data.Cod,
                abreviature: data.Abreviature,
                details: data.Details,

                accountsGroupsID: data.AccountGroup,
                taxesID: parseInt(data.Taxes),
                extaxRevenueAccount: parseInt(data.extaxRevenueAccount),
                propertyID: propertyID,
                createdBy: userID

            }
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
