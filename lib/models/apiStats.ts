import {Stats} from "@prisma/client";

export interface ApiStats extends Stats {
    memoryUsage: string;
    duration: Duration;
}
