export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://back-end-production-7214.up.railway.app/api";

export async function apiFetch(endpoint: string, options: any = {}) {
  const token = localStorage.getItem("bikelab_token"); // O como lo guardes en AuthContext
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
