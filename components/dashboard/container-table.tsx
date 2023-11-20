import Container from "@/lib/models/container";
import StateBadge from "@/components/dashboard/state-badge";
import Link from "next/link";
import ContainerActions from "@/components/dashboard/container-actions";
import {containerAction} from "@/lib/docker";
import {revalidatePath} from "next/cache";

export default async function ContainerTable({ containers} : { containers: Container[] }) {

    async function action(id: string, action: "start" | "stop" | "restart") {
        "use server";
        await containerAction(id, action);
        revalidatePath('/', 'page');
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
            {containers.map((container) => {
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
                            {container.Ports.filter(p => p.PublicPort && p.Type === "tcp")
                                .map(p => `${p.IP}:${p.PublicPort}:${p.PrivatePort}`)
                                .map(p => <div className={'badge gap-3 m-1 badge-info'} key={p}>{p}</div>)}
                            </div>
                        </td>
                        <td className={'w-1/5 text-center'}>
                            <ContainerActions id={container.Id} state={container.State} dispatch={action} />
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        </div>
    </div>
}
