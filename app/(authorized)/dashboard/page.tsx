import DockerDashboard from "@/components/dashboard/docker-dashboard";

export default function Page() {
    return (
        <main>
            <div className={"grid grid-cols-4"}>
                <div className={"col-span-4"}>
                    <DockerDashboard />
                </div>
            </div>
        </main>
    )
}
