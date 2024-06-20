import { useAuthStore } from "@/stores/auth";
import { BASE_URL } from "./api";


export const getActivities = async () => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/v1/activities`, {
        headers: {
            "Authorization": `Bearer ${auth.token}`
        }
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message)
    }

    return result.data;
};

export const deleteActivity = async (id: string) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/v1/activities/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${auth.token}`
        }
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message)
    }
};

export const createActivity = async (payload: any) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/v1/activities`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${auth.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message)
    }

    return result;
};