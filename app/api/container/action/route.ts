import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import { containerAction } from "@/lib/docker";

export async function POST(req: NextRequest, res: NextResponse) {
    const session = await auth();

    if(!session) return NextResponse.json({}, {status: 401});

    const {id, action} = await req.json() as {id: string, action: "start" | "stop" | "restart"};
    const message = await containerAction(id, action);

    return NextResponse.json({ message }, { status: 200 });
}
