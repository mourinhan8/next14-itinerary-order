import { PrismaClient } from "@prisma/client";
import { Flight, sortAndValidateItineraries } from "@/utils";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { itinerary }: { itinerary: Flight[]; } = body;

    if (!Array.isArray(itinerary)) {
        return NextResponse.json(
            { message: "Invalid data format" },
            { status: 400 }
        );
    }

    try {
        const sortedItinerary = sortAndValidateItineraries(itinerary);
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        await prisma.itinerary.create({
            data: {
                itinerary: JSON.stringify(sortedItinerary),
                requesterIp: ip.toString(),
            }
        });

        return NextResponse.json(
            sortedItinerary,
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: (error as Error).message },
            { status: 400 }
        );
    }
}

export async function GET(req: Request) {
    return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
    );
}