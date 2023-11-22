import {signIn} from "@/auth";

export default function Page() {
    async function authenticate() {
        "use server"
        await signIn('github', { redirectTo: '/' });
    }

    return (
        <main className={"flex flex-col items-center justify-between pt-24"}>
            <div className={"card shadow-2xl bg-base-300"}>
                <div className={"card-body"}>
                    <h1 className={"card-title"}>Login</h1>
                <form action={authenticate}>
                    <button type={"submit"} className={"btn btn-primary mt-5 w-full"}>Login with Github</button>
                </form>
                </div>
            </div>
        </main>
    );
}
