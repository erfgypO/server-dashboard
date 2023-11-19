"use client";
import axios, {AxiosError} from "axios";
import {useState} from "react";

export default function ContainerActions({ id, state, onActionClicked } : { id: string, state: string, onActionClicked: () => void }) {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    async function runAction(action: "start" | "restart" | "stop") {
        setLoading(true);
        try {
            const response = await axios.post('/api/container/action', { id, action });

            const message = response.data.message as string;

            if(!message) {
                onActionClicked();
            } else {
                setMessage(message);
                console.warn(message);
            }
        } finally {
            setLoading(false);
        }
    }

    return <>
        <div className={"join"}>
            <button className={`btn btn-sm btn-success join-item ${loading || state === 'running' ? 'btn-disabled' : ''}`} onClick={() => runAction("start")}>Start</button>
            <button className={`btn btn-sm btn-warning join-item ${loading ? 'btn-disabled' : ''}`} onClick={() => runAction("restart")}>Restart</button>
            <button className={`btn btn-sm btn-error join-item ${loading || state !== 'running' ? 'btn-disabled' : ''}`} onClick={() => runAction("stop")}>Stop</button>
        </div>
    </>
}
