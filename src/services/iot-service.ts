import { apiFetch } from "../lib/api";

export type IotEventType =
  | "SPEED_ALERT"
  | "NEAR_LIMIT"
  | "GPS_UPDATE"
  | "GEOFENCE_OUTSIDE"
  | "UNLOCKED"
  | "LOCKED"
  | "COMMAND_ACK"
  | "CONFIG_UPDATED"
  | "RESET"
  | "HEARTBEAT";

export interface IotDeviceEvent {
  id: string;
  deviceId: string;
  eventType: IotEventType;
  blocked: boolean;
  message: string;
  occurredAt: string;
  receivedAt: string;
  latitude?: number;
  longitude?: number;
  speedKmph?: number;
  insideGeofence?: boolean;
  lockState?: string;
}

export interface IotDeviceConfig {
  deviceId: string;
  speedLimitKmph: number;
  geofenceCenterLat: number;
  geofenceCenterLon: number;
  geofenceRadiusMeters: number;
  updatedAt?: string;
}

export interface IotDeviceState {
  deviceId: string;
  eventType: IotEventType;
  blocked: boolean;
  message: string;
  latitude?: number;
  longitude?: number;
  speedKmph?: number;
  insideGeofence?: boolean;
  lockState?: string;
  updatedAt: string;
}

export interface IotDeviceCommand {
  commandId: string;
  deviceId: string;
  type: "LOCK" | "UNLOCK" | "RESET" | "SET_CONFIG";
  reason: string;
  status: string;
  createdAt: string;
}

export const IotService = {
  getLatestEvent: async (): Promise<IotDeviceEvent | null> => {
    return await apiFetch("/iot/events/latest");
  },

  getRecentEvents: async (limit = 20): Promise<IotDeviceEvent[]> => {
    return await apiFetch(`/iot/events?limit=${limit}`);
  },

  getDeviceConfig: async (deviceId: string): Promise<IotDeviceConfig> => {
    return await apiFetch(`/iot/devices/${deviceId}/config`);
  },

  updateDeviceConfig: async (
    deviceId: string,
    data: {
      speedLimitKmph: number;
      geofenceCenterLat: number;
      geofenceCenterLon: number;
      geofenceRadiusMeters: number;
    }
  ): Promise<IotDeviceConfig> => {
    return await apiFetch(`/iot/devices/${deviceId}/config`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  getDeviceState: async (deviceId: string): Promise<IotDeviceState | null> => {
    return await apiFetch(`/iot/devices/${deviceId}/state`);
  },

  sendCommand: async (
    deviceId: string,
    type: IotDeviceCommand["type"],
    reason: string
  ): Promise<IotDeviceCommand> => {
    return await apiFetch(`/iot/devices/${deviceId}/commands`, {
      method: "POST",
      body: JSON.stringify({ type, reason }),
    });
  },
};
