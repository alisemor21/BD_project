import http from "@/netClient/config";

export async function getAllContracts() {
  try {
    const response = await http.get("/api/contracts", {});
    return response.data.contractList ?? [];
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function getContractById(id) {
  try {
    const response = await http.get("/api/contracts", {
      params: {
        id,
      },
    });
    return response.data ?? [];
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function createContract(clientId, info) {
  try {
    const response = await http.post(
      "/api/contracts",
      {
        clientId,
        info,
      },
      {}
    );
    return response.data ?? [];
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function patchContractById(id, clientId, info) {
  try {
    const response = await http.patch("/api/contracts/" + id,
      {
        clientId,
        info,
      },{});
    return response.data ?? [];
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function deleteContractById(id) {
  try {
    const response = await http.delete("/api/contracts/" + id, {});
    return response.data ?? {};
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function fetchClientContractList(clientId) {
  try {
    const response = await http.get("/api/contracts/client-contracts/" + clientId);
    return response.data?.contract ?? [];
  } catch (error) {
    console.error({ error });
    throw error;
  }
}