"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthResponse, User } from "../types/api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // Solución al error ts(2339) [cite: 291, 292]
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado inicial de carga [cite: 294]
  const router = useRouter();

  useEffect(() => {
    // Sincronización: Recuperar sesión al montar el componente [cite: 292]
    const savedToken = localStorage.getItem("bikelab_token");
    const savedUser = localStorage.getItem("bikelab_user");
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    // Una vez terminada la lectura de localStorage, dejamos de cargar 
    setIsLoading(false); 
  }, []);

// ... dentro de tu AuthProvider
const login = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:8080/api/iam/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Credenciales inválidas");

    const data: AuthResponse = await res.json();
    
    // IMPORTANTE: Actualizar el estado de React ANTES de que el componente useAuth lea isAuthenticated
    setToken(data.token);
    setUser(data.user);
    
    // Guardar en Storage
    localStorage.setItem("bikelab_token", data.token);
    localStorage.setItem("bikelab_user", JSON.stringify(data.user));

    // Ahora isAuthenticated pasará a ser TRUE inmediatamente
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("bikelab_token");
    localStorage.removeItem("bikelab_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated: !!token, 
      isLoading, // Exponemos isLoading al resto de la app [cite: 294]
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};