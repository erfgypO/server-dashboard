import {getSession} from "@/auth";
import {NextRequest, NextResponse} from "next/server";
import {getChartStats} from "@/lib/stats";

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getSession();

    if(!session) return NextResponse.json({}, {
        status: 401
    });


    const timestamp =Number.parseInt(req.nextUrl.searchParams.get('after') || '0');
    const after = new Date(timestamp);

    const stats = await getChartStats(after);
    return NextResponse.json(stats);
}
