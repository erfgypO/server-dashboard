import Container from "@/lib/models/container";

export default function ContainerCard({ container} : { container: Container }) {
    let containerName = container.Names[0];

    if(containerName.startsWith('/')) {
        containerName = containerName.substring(1);
    }

    return <div className={"stats"}>
        <div className={"stat"}>
            <div className={"stat-title"}>Status</div>
            <div className={"stat-value"}>{ container.Status }</div>
        </div>
        <div className={"stat"}>
            <div className={"stat-title"}>State</div>
            <div className={"stat-value"}>{ container.State }</div>
        </div>
    </div>

}
