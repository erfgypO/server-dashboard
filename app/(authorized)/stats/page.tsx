import { StatsProvider } from '@/app/(authorized)/stats/statsContext';
import ChartCard from "@/components/stats/chartCard";
import { getChartStats } from "@/lib/stats";
export default async function Page() {

    const stats = await getChartStats();

    const chartHeight = 250;

    return <>
        <StatsProvider initialStats={stats}>
            <div className={"grid grid-cols-2 gap-4"}>
                <div className={"col col-span-2 lg:col-span-1"}>
                    <ChartCard title={"CPU Usage"} statsKey={"cpu"} chartHeight={chartHeight} />
                </div>
                <div className={"col col-span-2 lg:col-span-1"}>
                    <ChartCard title={"Memory Usage"} statsKey={"memory"} chartHeight={chartHeight} />
                </div>
                <div className={"col col-span-2"}>
                    <ChartCard title={"Disk Usage"} statsKey={"disk"} chartHeight={chartHeight} />
                </div>
            </div>
        </StatsProvider>
    </>
}
