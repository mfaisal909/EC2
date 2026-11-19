const API_URL = import.meta.env.VITE_API_URL || "";

const request = async (path, options = {}) => {
  const res = await fetch(`${API_URL}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Request failed");
  }
  return res.json();
};

export const getTasks = () => request("/tasks");
export const createTask = (task) =>
  request("/tasks", { method: "POST", body: JSON.stringify(task) });
export const updateTask = (id, task) =>
  request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(task) });
export const deleteTask = (id) =>
  request(`/tasks/${id}`, { method: "DELETE" });
export const checkHealth = () => request("/health");
