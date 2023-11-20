"use client";
import {useState} from "react";

export default function ContainerActions({ id, state, dispatch } : { id: string, state: string, dispatch: (id: string, state: "start" | "stop" | "restart") => Promise<void> }) {

    const [loading, setLoading] = useState(false);

    function onClick(state: "start" | "stop" | "restart") {
        return async () => {
            setLoading(true);
            await dispatch(id, state);
            setLoading(false);
        }
    }

    return <>
        <div className={"join"}>
                <button type={"button"} onClick={onClick("start")} className={`btn btn-sm join-item ${state === "running" || loading ? "btn-disabled" : "btn-success"} `}>Start</button>
                <button type={"button"} onClick={onClick("restart")} className={`join-item btn btn-sm btn-warning ${loading ? "btn-disabled" : ""}`}>Restart</button>
                <button type={"button"} onClick={onClick("stop")} className={`btn btn-sm ${state !== "running" || loading ? "btn-disabled" : "btn-error"} join-item`}>Stop</button>
        </div>
    </>
}
