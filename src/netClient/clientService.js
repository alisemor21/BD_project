import http from "@/netClient/config";

export async function fetchClientList() {
    try {
        const response = await http.get("/api/clients");
        return response.data.employees ?? [];
    } catch (error) {
        console.error({ error });
        throw error;
    }
}

export async function createClient(name, inn, ogrn, contactFaceList) {
    try {
        const response = await http.post("/api/clients", {
            name, inn, ogrn, contactFaceList
        });
        return response.data?.result ?? [];
    } catch (error) {
        console.error({ error });
        throw error;
    }
}

export async function patchClientById(id, name, role, login, password) {
    try {
        const response = await http.patch("/api/clients/" + id, {
            name,
            role,
            login,
            password,
        });
        return response.data ?? [];
    } catch (error) {
        console.error({ error });
        throw error;
    }
}

export async function deleteClientById(id) {
    try {
        const response = await http.delete("/api/clients/" + id);
        return response.data ?? {};
    } catch (error) {
        console.error({ error });
        throw error;
    }
}

export async function fetchClientById(id) {
    try {
        const response = await http.get("/api/clients", {
            params: {
                id,
            },
        });
        return response.data ?? {};
    } catch (error) {
        console.error({ error });
        throw error;
    }
}

export async function getMyInfo() {
    try {
        const response = await http.get("/api/employees/me");
        return response.data ?? {};
    } catch (error) {
        console.error({ error });
        throw error;
    }
}

