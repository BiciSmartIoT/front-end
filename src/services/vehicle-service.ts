import { apiFetch } from "../lib/api";

export interface Vehicle {
  id: string;

  ownerId?: string;

  title: string;

  description: string;

  hourlyPrice: number;

  latitude: number;

  longitude: number;

  deviceId?: string;

  status:
    | "AVAILABLE"
    | "IN_SERVICE"
    | "MAINTENANCE"
    | "PENDING";

  ratingAvg?: number;

  image?: string;

  createdAt?: string;

  updatedAt?: string;
}

export const VehicleService = {
  getAllVehicles: async (): Promise<Vehicle[]> => {
    return await apiFetch("/vehicles");
  },

  getOwnFleet: async (): Promise<Vehicle[]> => {
    return await apiFetch("/vehicles/own");
  },

  createVehicle: async (data: {
    title: string;
    description: string;
    hourlyPrice: number;
    latitude: number;
    longitude: number;
    deviceId?: string;
  }) => {
    return await apiFetch("/vehicles", {
      method: "POST",

      body: JSON.stringify({
        title: data.title,
        description: data.description,
        hourlyPrice: data.hourlyPrice,
        latitude: data.latitude,
        longitude: data.longitude,
        deviceId: data.deviceId || undefined,
      }),
    });
  },

  updateVehicle: async (
    id: string,
    data: Partial<{
      title: string;
      description: string;
      hourlyPrice: number;
      latitude: number;
      longitude: number;
      deviceId: string;
      desiredStatus: Vehicle["status"];
    }>
  ): Promise<Vehicle> => {
    return await apiFetch(`/vehicles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  getVehicleById: async (
    id: string
  ): Promise<Vehicle> => {
    return await apiFetch(`/vehicles/${id}`);
  },
};
