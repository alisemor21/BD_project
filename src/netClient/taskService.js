import http from '@/netClient/config';


export async function getAllTasks() {
    try {
      const response = await http.get("/api/tasks", {
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

  export async function getTaskById(id) {
    try {
      const response = await http.get("/api/tasks", {
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


  export async function createTask(author, executor, priority, status, type, deadline) {
    try {
      const response = await http.post("/api/tasks",
        {
            author,
            executor,
            priority,
            status,
            type,
            deadline,
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
  
  export async function patchTaskById(id, author, executor, priority, status, type, deadline) {
    try {
      const response = await http.patch(
        "/api/tasks/" + id,
        {
            author,
            executor,
            priority,
            status,
            type,
            deadline,
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

  export async function deleteTaskById() {
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
  