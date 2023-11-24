"use client";

import { useContext} from "react";
import { StatsContext } from "@/app/(authorized)/stats/statsContext";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";

export default function ChartCard({ chartHeight, statsKey, title } : { chartHeight?: number, statsKey: "cpu" | "memory" | "disk", title: string}) {
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

    let dataPoints;

    switch (statsKey) {
        case "memory":
            dataPoints = chartStats.map(stat => stat.memory);
            break;
        case "cpu":
            dataPoints = chartStats.map(stat => stat.cpu);
            break;
        case "disk":
            dataPoints = chartStats.map(stat => stat.disk);
            break;
    }

    const cpuColor = {
        border: 'rgb(117, 130, 255)',
        background: 'rgba(117, 130, 255, 0.5)'
    }

    const memoryColor = {
        border: 'rgb(0, 199, 181)',
        background: 'rgba(0, 199, 181, 0.5)'
    }


    const color = statsKey === "cpu" ? cpuColor : memoryColor;
    const labels = chartStats.map(stat => new Date(stat.timestamp).toLocaleTimeString());

    const datasets = [{
        label: title,
        data: dataPoints, //chartStats.map(stat => statsKey === "cpu" ? stat.cpu : stat.memory),
        borderColor: color.border,
        backgroundColor: color.background,
        tension: 0.5,
    }];

    const data = {
        labels,
        datasets,
    };

    const currentUsage = chartStats[chartStats.length - 1][statsKey].toFixed(2);
    return <div className={"card bg-base-300 shadow-2xl w-full mb-2"}>
        <div className={"card-body"}>
            <h1 className={"card-title"}>{ title }: {currentUsage}%</h1>
            <div>
                <Line data={data} options={options} height={chartHeight ?? 400} />
            </div>
        </div>
    </div>
}
