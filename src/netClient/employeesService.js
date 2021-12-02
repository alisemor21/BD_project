import http from "@/netClient/config";

export async function getAllEmployees() {
  try {
    const response = await http.get("/api/employees");
    return response.data?.employees ?? [];
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function getEmployeeById(id) {
  try {
    const response = await http.get("/api/employees", {
      params: {
        id,
      }
    });
    return response.data ?? [];
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

export async function createEmployee(name, role, login, password) {
  try {
    const response = await http.post("/api/employees", {
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

export async function patchEmployeeById(id, name, role, login, password) {
  try {
    const response = await http.patch("/api/employees/" + id, {
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

export async function deleteEmployeeById(id) {
  try {
    const response = await http.delete("/api/employees/" + id);
    return response.data ?? {};
  } catch (error) {
    console.error({ error });
    throw error;
  }
}
