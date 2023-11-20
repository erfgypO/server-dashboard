"use server";

import axios from "axios";
import Container from "@/lib/models/container";
import {revalidatePath} from "next/cache";
import {useRouter} from "next/router";

const socketClient = axios.create({
    socketPath: "/var/run/docker.sock",
})

export async function listContainers(all = false) {
    const response = await socketClient.get<Container[]>(`/containers/json?all=${all}`);

    return response.data;
}

export async function containerAction(id: string, action: "start" | "stop" | "restart") {
    let message = "";
    try {
        const response = await socketClient.post(`/containers/${id}/${action}`);

        return undefined;
    } catch (error) {
        const axiosError = error as {response: {status: number, data: {message: string}}};

        return axiosError.response.data.message;
    }
}

export async function inspectContainer(id: string) {
    try {
        const response = await socketClient.get<Container>(`/containers/${id}/json`);

        return response.data;
    } catch (e) {
        return undefined;
    }
}

