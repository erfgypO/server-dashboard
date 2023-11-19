import { listContainers } from "@/lib/docker";
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await auth();

    if(!session) return NextResponse.json({}, {status: 401});

    const containers = await listContainers(true);
    return NextResponse.json(containers);
}
