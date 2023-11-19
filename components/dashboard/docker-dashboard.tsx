"use server";

import {listContainers} from "@/lib/docker";
import ContainerCard from "@/components/dashboard/container-card";
import ContainerTable from "@/components/dashboard/container-table";

export default async function DockerDashboard() {
    const containers = await listContainers(true);

    return (
        <div className={"card bg-base-300 shadow-2xl w-full "}>
            <div className={"card-body"}>
                <h1 className={"card-title"}>Container</h1>
                <ContainerTable containers={containers} />
            </div>
        </div>
    )
}
