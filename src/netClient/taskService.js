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


/**
 * JSDOC
 * @param {*} creatorId - Антон сосет жопу
 * @param {*} executorId 
 * @param {*} priority 
 * @param {*} status 
 * @param {*} description 
 * @param {*} deadline 
 * @param {*} contactFaceId 
 * @param {*} contractId 
 * @returns 
 */
export async function createTask(creatorId, executorId, priority, status, description, deadline, contactFaceId, contractId) {
  try {
    const response = await http.post("/api/tasks",
      {
        creatorId,
        executorId,
        priority,
        status,
        description,
        deadline,
        contactFaceId,
        contractId
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

export async function patchExecutorTaskById(id, executorId){
  try {
    const response = await http.patch(
      "/api/tasks/" + id + "/executor",
      {
        executorId,
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

export async function patchStatusTaskById(id){
  try {
    const response = await http.patch(
      "/api/tasks/" + id + "/status",
      {},
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

export async function patchTaskById(id, priority, status, description, deadline, contactFaceId, contractId,) {
  try {
    const response = await http.patch(
      "/api/tasks/" + id,
      {
        priority,
        status,
        description,
        deadline,
        contactFaceId,
        contractId,
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

export async function deleteTaskById(id) {
  try {
    const response = await http.delete("/api/tasks/" + id, {
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
