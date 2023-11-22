"use client";

import { useContext} from "react";
import { StatsContext } from "@/app/(authorized)/stats/statsContext";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";

export default function ChartCard({ chartHeight, statsKey, title } : { chartHeight?: number, statsKey: "cpu" | "memory", title: string}) {
    Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const { chartStats } = useContext(StatsContext);

    const options = {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 100,
            },
        },
        animation: {
            duration: 50
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    };



    const labels = chartStats.map(stat => {
        const timestamp = new Date(stat.timestamp);

        const hours = timestamp.getHours().toString().padStart(2, '0');
        const minutes = timestamp.getMinutes().toString().padStart(2, '0');
        const seconds = timestamp.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    });
    const datasets = [{
        label: title,
        // @ts-ignore
        data: chartStats.map(stat => statsKey === "cpu" ? stat.cpu : stat.memory),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.5,
    }];

    const data = {
        labels,
        datasets,
    };
    return <div className={"card bg-base-300 shadow-2xl w-full mb-2"}>
        <div className={"card-body"}>
            <h1 className={"card-title"}>{ title }</h1>
            <div>
                <Line data={data} options={options} height={chartHeight ?? 400} />
            </div>
        </div>
    </div>
}
