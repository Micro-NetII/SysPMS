
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";


export async function GET(request, context) {

    // console.log("1")

    // const pathname = new URL(request.url).pathname;

    // const parts = pathname.split('/');

    // const id = parts[parts.length - 1];

    const { id } = context.params;

    //console.log(id)

    const response = await prisma.characteristics.findUnique({
        where: {
            characteristicID: parseInt(id)
        }
    })

    if (!response) {
        return new NextResponse(JSON.stringify({status: 404 }));
    }

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({response, status: 200 }));
}

export async function PATCH(request, context) {


    try {
        const { id } = context.params;
        const { data } = await request.json();

        const updateRecord = await prisma.characteristics.update({
            where: {
                characteristicID: parseInt(id),
            },
            data: {
                description: data.description,
                abreviature: data.abreviature,
                details: data.details
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}

export async function DELETE(request, context) {

    try {
        const { id } = context.params;

        //console.log(id)

        const deleteRecord = await prisma.characteristics.delete({
            where: {
                characteristicID: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}




