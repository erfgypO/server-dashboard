"use server";

import db from "@/lib/db";
import {ApiStats} from "@/lib/models/apiStats";
import { intervalToDuration } from "date-fns";
export async function getStatsObject() {
    console.log('Fetching stats object');
    const dbStats = await db.stats.findFirstOrThrow({
        orderBy: {
            createdAt: "desc"
        }
    });


    const now = new Date(0);
    now.setSeconds(dbStats.uptime);

    const duration = intervalToDuration({
        start: new Date(0),
        end: now,
    });

    const memoryUsage = (dbStats.usedMemory / dbStats.totalMemory) * 100;
    return {
        ...dbStats,
        memoryUsage: memoryUsage.toFixed(2),
        uptimeString: now.toISOString().substring(9, 19),
        duration,
    } as ApiStats;
}
