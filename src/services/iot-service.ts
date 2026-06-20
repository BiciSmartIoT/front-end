import { apiFetch } from "../lib/api";

export type IotEventType =
  | "SPEED_ALERT"
  | "NEAR_LIMIT"
  | "LOCKED"
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
}

export const IotService = {
  getLatestEvent: async (): Promise<IotDeviceEvent | null> => {
    return await apiFetch("/iot/events/latest");
  },

  getRecentEvents: async (limit = 20): Promise<IotDeviceEvent[]> => {
    return await apiFetch(`/iot/events?limit=${limit}`);
  },
};
