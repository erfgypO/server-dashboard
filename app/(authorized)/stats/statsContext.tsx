"use client";

import {createContext, ReactNode, useEffect, useState} from "react";
import {ChartStat} from "@/lib/models/chartStat";
import axios from "axios";

export const StatsContext = createContext<{ chartStats: ChartStat[]}>({ chartStats: []});

export function StatsProvider({ children, initialStats } : { children: ReactNode, initialStats:  ChartStat[]}) {
    const [chartStats, setChartStats] = useState(initialStats);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const timestamp = chartStats.length > 0 ? new Date(chartStats[chartStats.length - 1].timestamp).getTime() : 0;
                const response = await axios.get(`/api/stats/chart?after=${timestamp}`);
                if (response.status === 200) {
                    setChartStats([...chartStats, ...response.data].slice(-12));
                }
            } catch (e) {
                console.log('Failed to chart read chart');
                console.error(e);
            }
        }, 5_000);

        return () => clearInterval(interval);
    });

    return <StatsContext.Provider value={{ chartStats }}>
        {children}
    </StatsContext.Provider>
}
