import {Stats} from "@prisma/client";

export interface ApiStats extends Stats {
    memoryUsage: string;
    uptimeString: string;
    duration: Duration;
}
