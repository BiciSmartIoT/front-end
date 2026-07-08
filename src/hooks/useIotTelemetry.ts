import { useEffect, useState } from "react";

import { IotDeviceEvent, IotService } from "../services/iot-service";
import { hasAuthToken } from "../lib/api";

const POLL_INTERVAL_MS = 5000;
const ONLINE_WINDOW_MS = 30000;

export function useIotTelemetry() {
  const [latestEvent, setLatestEvent] = useState<IotDeviceEvent | null>(null);
  const [events, setEvents] = useState<IotDeviceEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setInterval>;

    const load = async () => {
      if (!hasAuthToken()) {
        setLatestEvent(null);
        setEvents([]);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        const [latest, recent] = await Promise.all([
          IotService.getLatestEvent(),
          IotService.getRecentEvents(8),
        ]);

        if (!active) {
          return;
        }

        setLatestEvent(latest);
        setEvents(recent);
        setError(null);
      } catch (err) {
        if (!active) {
          return;
        }

        setError(err instanceof Error ? err.message : "No se pudo leer la telemetria IoT");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();
    timer = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  const isOnline =
    latestEvent != null &&
    Date.now() - new Date(latestEvent.receivedAt).getTime() <= ONLINE_WINDOW_MS;

  return {
    latestEvent,
    events,
    loading,
    error,
    isOnline,
    pollIntervalMs: POLL_INTERVAL_MS,
  };
}
