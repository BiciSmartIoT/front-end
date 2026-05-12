// src/lib/api.ts
export async function apiFetch(endpoint: string, options: any = {}) {
  const token = localStorage.getItem("bikelab_token"); // O como lo guardes en AuthContext
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`http://localhost:8080/api${endpoint}`, {
    ...options,
    headers,
  });
  if (response.status === 401) {
    console.error("Sesión expirada");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error en la petición");
  }

  return response.json();
}