"use server";

import db from "@/lib/db";
import {ApiStats} from "@/lib/models/apiStats";
import { intervalToDuration } from "date-fns";
import {ChartStat} from "@/lib/models/chartStat";
export async function getStatsObject() {
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
        duration,
    } as ApiStats;
}

export async function getChartStats(after: Date | undefined = undefined) {
    let stats = [];

    const select = {
        createdAt: true,
        usedMemory: true,
        totalMemory: true,
        cpuUsage: true,
    };

    if(!after) {
        stats = (await db.stats.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 12,
            select,
        })).reverse();
    } else {
        stats = await db.stats.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                createdAt: {
                    gt: after,
                }
            },
            take: 1,
            select,
        });
    }

    return stats.map((item) => {
        return {
            cpu: item.cpuUsage,
            memory: (item.usedMemory / item.totalMemory) * 100,
            timestamp: item.createdAt,
        } as ChartStat;
    });
}
