import http from "@/netClient/config";

export async function getAllEmployees() {
  try {
    const response = await http.get("/api/employees", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.accessToken,
      },
    });
    return response.data ?? [];
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
      },
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.accessToken,
      },
    });
    return response.data ?? [];
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function createEmployee(name, role, login, password) {
  try {
    const response = await http.post("/api/employees",
      {
        name,
        role,
        login,
        password,
      },
      {
        headers: {
          "Contentt-Type": "application/json",
          "x-access-token": localStorage.accessToken,
        },
      });
    return response.data ?? [];
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function patchEmployeeById(id, name, role, login, password) {
  try {
    const response = await http.patch(
      "/api/employees/" + id,
      {
        name,
        role,
        login,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.accessToken,
        },
      }
    );
    return response.data ?? [];
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function doDeleteEmployeeById() {
  try {
    const response = await http.delete("/api/employees/:id", {
      headers: {
        "Contentt-Type": "application/json",
        "x-access-token": localStorage.accessToken,
      },
    });
    return response.data ?? [];
  } catch (error) {
    console.error({ error });
    throw error;
  }
}
