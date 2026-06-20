export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://back-end-production-7214.up.railway.app/api";

export const TOKEN_STORAGE_KEY = "bicesmartiot_token";
export const USER_STORAGE_KEY = "bicesmartiot_user";

export async function apiFetch(endpoint: string, options: any = {}) {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

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
    console.error("Sesion expirada");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        errorData.detail ||
        errorData.title ||
        `Error HTTP ${response.status}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
