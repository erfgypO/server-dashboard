import {NextRequest, NextResponse} from "next/server";
import db from "@/lib/db";
import {auth} from "@/auth";
import { getStatsObject } from "@/lib/stats";

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await auth();

    if(!session) return NextResponse.json({}, {status: 401});

    const stats = await getStatsObject();
    return NextResponse.json(stats);
}

export async function POST(req: NextRequest, res: NextResponse) {
    const apiKey = req.headers.get('x-api-key');

    if(!apiKey || apiKey !== process.env.API_KEY)
        return NextResponse.json({}, {status: 401});

    const payload = await req.json();// as Stats;

    await db.stats.create({
        data: payload,
    });

    return NextResponse.json({}, {status: 200});
}
