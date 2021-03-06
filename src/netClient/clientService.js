import http from "@/netClient/config";
import { prepareFormData, covertClientList, covertClient } from "@/utils/dataUtil";

export async function fetchClientList() {
    try {
        const response = await http.get("/api/clients");
        return covertClientList(response.data.result);
    } catch (error) {
        console.error({ error });
        throw error;
    }
}

export async function createClient(formData) {
    try {
        const response = await http.post("/api/clients/", {
            ...prepareFormData(formData)
        });
        return response.data?.result ?? [];
    } catch (error) {
        console.error({ error });
        throw error;
    }
}

export async function patchClientById(formData) {
    const { id, ...otherFields } = formData;
    try {
        const response = await http.patch("/api/clients/" + id, {
            ...prepareFormData(otherFields),
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

export async function blackListClient(id) {
  try {
      const response = await http.patch("/api/clients/" + id + '/black-list');
      return response.data ?? {};
  } catch (error) {
      console.error({ error });
      throw error;
  }
}

export async function fetchClientById(id) {
    try {
        const response = await http.get("/api/clients/" + id);    
        return covertClient(response.data);
    } catch (error) {
        console.error({ error });
        throw error;
    }
}


export async function createContactFace(id, name, phone, email) {
    try {
      const response = await http.post("/api/clients/"+id+ "/contact-faces", {
        name, 
        phone, 
        email
      });
      return response.data ?? [];
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  
  export async function deleteContactFaceById(clientId, contactFaceId) {
    try {
      const response = await http.delete("/api/clients/"+clientId+"/contact-faces/" + contactFaceId);
      return response.data ?? {};
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  export async function fetchContactFaceList() {
    try {
      const response = await http.get("/api/clients/contact-faces/show-all");
      return response.data?.contactFaces ?? [];
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }