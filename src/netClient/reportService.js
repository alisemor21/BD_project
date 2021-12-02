import http from "@/netClient/config";

export async function getAllReports() {
  try {
    const response = await http.get("/api/reports", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.accessToken,
      },
    });
    return response.data.reportList ?? {};
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

export async function createReport(reportedEmployeeId, dateFrom, dateTo) {
  try {
    const response = await http.post(
      "/api/reports",
      {
        reportedEmployeeId,
        dateFrom,
        dateTo,
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
      const response = await http.get("/api/reports/download/" + id, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.accessToken,
        },
      });
      let blob = new Blob([response.data], { type: 'application/vnd.ms-excel' }),
        url = window.URL.createObjectURL(blob)

      window.open(url)
      return response.data;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }