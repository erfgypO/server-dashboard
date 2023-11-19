"use client"

import Container from "@/lib/models/container";
import StateBadge from "@/components/dashboard/state-badge";
import Link from "next/link";
import ContainerActions from "@/components/dashboard/container-actions";
import axios from "axios";
import {useState} from "react";

export default function ContainerTable({ containers} : { containers: Container[] }) {

    const [items, setItems] = useState<Container[]>(containers);
    async function onActionClicked() {
        const response = await axios.get('/api/container');

        if(response.status === 200) {
            setItems(response.data);
        }
    }

    return <div>
        <div className={"overflow-auto"}>
        <table className={"table table-pin-rows"}>
            <thead>
            <tr>
                <th className={'w-1/5'}>Name</th>
                <th className={'w-1/5'}>Image</th>
                <th className={'w-1/5 text-center'}>State</th>
                <th className={'w-1/5'}>Ports</th>
                <th className={'w-1/5 text-center'}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {items.map((container) => {
                return (
                    <tr key={container.Id}>
                        <td className={'w-1/5 link-accent'}>
                            <Link href={`/container/${container.Id}`}>
                                {container.Names[0].substring(1)}
                            </Link>
                            </td>
                        <td className={'w-1/5'}>{container.Image}</td>
                        <td className={'w-1/5 text-center'}>
                            <StateBadge state={container.State} />
                        </td>
                        <td className={'w-1/5'}>
                            <div>
                            {container.Ports.filter(p => p.PublicPort && p.Type === "tcp").map(p => `${p.IP}:${p.PublicPort}:${p.PrivatePort}`).join(', ')}
                            </div>
                        </td>
                        <td className={'w-1/5 text-center'}>
                            <ContainerActions id={container.Id} state={container.State} onActionClicked={onActionClicked} />
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        </div>
    </div>
}
