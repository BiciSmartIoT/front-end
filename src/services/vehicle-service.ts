import { apiFetch } from "../lib/api";

export interface Vehicle {
  id: string;
  title: string;
  description: string;
  hourlyPrice: number;
  status: 'AVAILABLE' | 'IN_SERVICE' | 'MAINTENANCE' | 'PENDING';
  ratingAvg?: number;
  image?: string;
}

export const VehicleService = {
  // Para el Rider: Explora todas las bicis disponibles
  getAllVehicles: async (): Promise<Vehicle[]> => {
    return await apiFetch("/vehicles");
  },

  // Para el Provider: Ve solo sus propias máquinas
  getOwnFleet: async (): Promise<Vehicle[]> => {
    return await apiFetch("/vehicles/own");
  },

  // Crear nueva máquina
  createVehicle: async (data: Partial<Vehicle>) => {
    return await apiFetch("/vehicles", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Obtener detalle por ID
  getVehicleById: async (id: string): Promise<Vehicle> => {
    return await apiFetch(`/vehicles/${id}`);
  }
};