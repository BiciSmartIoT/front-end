// src/types/api.ts

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  user: User; // Aquí vinculamos la interfaz User
}