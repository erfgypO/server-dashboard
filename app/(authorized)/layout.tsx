"use server";
import {getSession} from "@/auth";
import {redirect} from "next/navigation";

export default async function Layout({children}: {children: React.ReactNode}) {
    const session = await getSession();

    if(session === null) {
        redirect('/login');
    }
    return <div className={"px-5"}>{children}</div>;
}
