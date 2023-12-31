"use client";

import { useState, useEffect } from "react";
import {ApiStats} from "@/lib/models/apiStats";
import axios from "axios";
import Link from "next/link";
import {ChevronRightIcon} from "@heroicons/react/20/solid";

export default function StatsDashboard({ initialStats }: { initialStats: ApiStats }){
    const [stats, setStats] = useState(initialStats);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get<ApiStats>(`/api/stats`);
                if(response.status === 200)
                    setStats(response.data);
            } catch (e) {
                console.log('Failed to read chart');
                console.error(e);
            }
        }, 5_000);

        return () => clearInterval(interval);
    });

    return <div className={"card bg-base-300 shadow-2xl w-full mb-2"}>
        <Link href={"/stats"}>
            <div className={"card-body"}>
                <h1 className={"card-title"}>
                    Stats
                </h1>
            <div className={"stats stats-vertical lg:stats-horizontal shadow"}>
                <div className={"stat place-items-center"}>
                    <div className={"stat-title"}>CPU Load</div>
                    <div className={"stat-value"}>{stats.cpuUsage.toFixed(2)}%</div>
                </div>
                <div className={"stat place-items-center"}>
                    <div className={"stat-title"}>Memory Usage</div>
                    <div className={"stat-value"}>{stats.usedMemory.toFixed(2)}%</div>
                </div>
                <div className={"stat place-items-center"}>
                    <div className={"stat-title"}>Disk Usage</div>
                    <div className={"stat-value"}>{stats.diskUsedPercent.toFixed(2)}%</div>
                </div>
                <div className={"stat place-items-center justify-center"}>
                    <div className={"stat-title"}>Uptime</div>
                    <div className={"stat-value"}>
                        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                        <div className={"flex flex-col"}>
                            <span className={"countdown font-mono justify-center"}>
                               { /* @ts-ignore */ }
                                <span style={{"--value": stats.duration.days ?? 0}}></span>
                            </span>
                          <span className={"text-sm"}>Days</span>
                        </div>
                        <div className={"flex flex-col"}>
                            <span className={"countdown font-mono justify-center"}>
                               { /* @ts-ignore */ }
                                <span style={{"--value": stats.duration.hours ?? 0}}></span>
                            </span>
                            <span className={"text-sm"}>Hours</span>
                        </div>
                        <div className={"flex flex-col"}>
                            <span className={"countdown font-mono justify-center"}>
                               { /* @ts-ignore */ }
                                <span style={{"--value": stats.duration.minutes ?? 0}}></span>
                            </span>
                            <span className={"text-sm"}>Minutes</span>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    </div>
}
