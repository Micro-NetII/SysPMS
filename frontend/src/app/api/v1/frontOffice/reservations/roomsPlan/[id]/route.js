import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request, context) {

    const prisma = generatePrismaClient()

    const { id } = context.params;

    const response = await prisma.reservations.findUnique({
        where: {
            reservationID: parseInt(id)
        }
    })

    if (!response) {
        return new NextResponse(JSON.stringify({ status: 404 }));
    }

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PATCH(request, context) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)

    try {
        const { id } = context.params;
        const { data } = await request.json();
        // Prepare um objeto de atualização vazio
        const updateData = {};

        // Adicione o checkInDate se ele estiver presente
        if (data.checkInDate) {
            updateData.checkInDate = new Date(data.checkInDate);
        }

        // Adicione o checkOutDate se ele estiver presente
        if (data.checkOutDate) {
            updateData.checkOutDate = new Date(data.checkOutDate);
        }

        if (data.roomNumber) {
            updateData.roomNumber = parseInt(data.roomNumber);
        }
        // Se updateData ainda estiver vazio, retorne um erro
        if (Object.keys(updateData).length === 0) {
            return new NextResponse(JSON.stringify({ error: 'Nenhum dado válido fornecido para atualização' }), { status: 400 });
        }

        // Atualize o registro apenas com os campos presentes
        const updateRecord = await prisma.reservations.update({
            where: {
                reservationID: parseInt(id),
            },
            data: updateData,
        });
        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}

export async function DELETE(request, context) {

    const prisma = generatePrismaClient()

    try {
        const { id } = context.params;

        const deleteRecord = await prisma.reservations.delete({
            where: {
                reservationID: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}


export async function PUT(request, context) {
    try {
        const { id } = context.params;
        const { data } = await request.json();

        const updateRecord = await prisma.reservations.update({
            where: {
                reservationID: parseInt(id),
            },
            data: {
                reservationStatus: parseInt(data.reservationStatus),
            }
        });

        return new NextResponse(JSON.stringify({ status: 200 }));
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

