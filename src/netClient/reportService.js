import http from "@/netClient/config";

export async function getAllReports() {
  try {
    const response = await http.get("/api/reports", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.accessToken,
      },
    });
    return response.data.tasks ?? [];
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function getReportById(id) {
  try {
    const response = await http.get("/api/reports", {
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

export async function createReport(employee, startDate, endDate) {
  try {
    const response = await http.post(
      "/api/reports",
      {
        employee,
        startDate,
        endDate,
      },
      {
        headers: {
          "Contentt-Type": "application/json",
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


export async function downloadReport(id) {
    try {
      const response = await http.get("/api/reports/download", {
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