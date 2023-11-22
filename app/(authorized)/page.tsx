import DockerDashboard from "@/components/dashboard/docker-dashboard";
import StatsDashboard from "@/components/dashboard/stats-dashboard";
import {getStatsObject} from "@/lib/stats";

export default async function Page() {

    const initialStats = await getStatsObject();

    return (
        <main>
            <div className={"grid grid-cols-4"}>
                <div className={"col-span-4"}>
                    <StatsDashboard initialStats={initialStats} />
                </div>
                <div className={"col-span-4"}>
                    <DockerDashboard />
                </div>
            </div>
        </main>
    )
}
