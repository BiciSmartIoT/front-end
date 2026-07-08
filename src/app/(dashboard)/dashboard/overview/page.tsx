"use client";

import { Activity, AlertTriangle, Lock, RefreshCw, Router, ShieldCheck } from "lucide-react";

import { useIotTelemetry } from "../../../../hooks/useIotTelemetry";
import { IotDeviceEvent, IotEventType } from "../../../../services/iot-service";

const EVENT_LABELS: Record<IotEventType, string> = {
  SPEED_ALERT: "Alerta de velocidad",
  NEAR_LIMIT: "Cerca del limite",
  GPS_UPDATE: "GPS actualizado",
  GEOFENCE_OUTSIDE: "Fuera de zona",
  UNLOCKED: "Desbloqueada",
  LOCKED: "Bloqueo activado",
  COMMAND_ACK: "Comando confirmado",
  CONFIG_UPDATED: "Config actualizada",
  RESET: "Sistema reiniciado",
  HEARTBEAT: "Conexion activa",
};

const EVENT_STYLES: Record<IotEventType, string> = {
  SPEED_ALERT: "text-yellow-300 border-yellow-300/30 bg-yellow-300/10",
  NEAR_LIMIT: "text-orange-300 border-orange-300/30 bg-orange-300/10",
  GPS_UPDATE: "text-cyan-300 border-cyan-300/30 bg-cyan-300/10",
  GEOFENCE_OUTSIDE: "text-red-300 border-red-300/30 bg-red-300/10",
  UNLOCKED: "text-primary border-primary/30 bg-primary/10",
  LOCKED: "text-red-300 border-red-300/30 bg-red-300/10",
  COMMAND_ACK: "text-blue-300 border-blue-300/30 bg-blue-300/10",
  CONFIG_UPDATED: "text-violet-300 border-violet-300/30 bg-violet-300/10",
  RESET: "text-blue-300 border-blue-300/30 bg-blue-300/10",
  HEARTBEAT: "text-primary border-primary/30 bg-primary/10",
};

export default function OverviewPage() {
  const { latestEvent, events, loading, error, isOnline, pollIntervalMs } = useIotTelemetry();

  const stats = [
    {
      label: "Conexion ESP32",
      value: isOnline ? "Online" : "Offline",
      icon: Router,
      detail: latestEvent ? `Actualiza cada ${pollIntervalMs / 1000}s` : "Sin eventos recibidos",
    },
    {
      label: "Estado de bloqueo",
      value: latestEvent?.blocked ? "Bloqueada" : "Libre",
      icon: Lock,
      detail: latestEvent?.blocked ? "Servo en modo bloqueo" : "Servo sin bloqueo activo",
    },
    {
      label: "Ultimo evento",
      value: latestEvent ? EVENT_LABELS[latestEvent.eventType] : "Pendiente",
      icon: Activity,
      detail: latestEvent ? formatDate(latestEvent.receivedAt) : "Esperando circuito",
    },
  ];

  return (
    <div className="p-10 max-w-7xl mx-auto text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-7">
        <div>
          <h1 className="text-4xl font-black italic uppercase leading-none">
            BiceSmart<span className="text-primary">IoT</span>
          </h1>
          <p className="text-gray-500 text-[11px] uppercase mt-2 tracking-wider">
            Edge, telemetria y seguridad del circuito ESP32
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
          <span className={`text-[10px] font-black uppercase tracking-widest ${isOnline ? "text-green-500" : "text-red-400"}`}>
            {isOnline ? "Live" : "Sin senal"}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-6 border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-px bg-white/10 mb-8 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#0a0a0a] px-5 py-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                  {stat.label}
                </p>
                <Icon size={13} className="text-primary opacity-70" />
              </div>
              <p className="text-2xl font-black italic tracking-tight">{stat.value}</p>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider mt-2">
                {stat.detail}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="border border-white/10 bg-[#0a0a0a] min-h-[360px] relative overflow-hidden p-6">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex h-full min-h-[310px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                  Nodo principal
                </p>
                <h2 className="mt-2 text-3xl font-black uppercase">
                  {latestEvent?.deviceId || "esp32-demo-01"}
                </h2>
              </div>
              <ShieldCheck className={isOnline ? "text-primary" : "text-white/20"} size={34} />
            </div>

            {loading ? (
              <div className="flex items-center gap-3 text-gray-500">
                <RefreshCw className="animate-spin" size={18} />
                <span className="text-xs uppercase tracking-widest">Cargando telemetria...</span>
              </div>
            ) : latestEvent ? (
              <LatestEventPanel event={latestEvent} />
            ) : (
              <div className="border border-white/10 bg-black/70 p-5">
                <AlertTriangle className="mb-4 text-yellow-300" size={28} />
                <p className="font-black uppercase">Aun no hay eventos del circuito</p>
                <p className="mt-2 text-sm text-gray-500">
                  Cuando el ESP32 envie HEARTBEAT, GPS_UPDATE, SPEED_ALERT o LOCKED, este panel se actualizara.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
              Historial IoT
            </p>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {events.length === 0 && !loading ? (
            <div className="border border-white/10 bg-[#0a0a0a] p-5 text-sm text-gray-500">
              Sin historial guardado en el backend.
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="border border-white/10 bg-[#0a0a0a] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className={`border px-2 py-1 text-[9px] font-black uppercase tracking-wider ${EVENT_STYLES[event.eventType]}`}>
                    {EVENT_LABELS[event.eventType]}
                  </span>
                  <span className="text-[9px] uppercase text-gray-600">
                    {formatDate(event.receivedAt)}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-300">{event.message}</p>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-gray-600">
                  {event.deviceId} · {event.blocked ? "bloqueada" : "sin bloqueo"}
                </p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

function LatestEventPanel({ event }: { event: IotDeviceEvent }) {
  return (
    <div className="border border-white/10 bg-black/80 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={`border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider ${EVENT_STYLES[event.eventType]}`}>
          {EVENT_LABELS[event.eventType]}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500">
          {formatDate(event.receivedAt)}
        </span>
      </div>
      <p className="mt-5 text-2xl font-black uppercase">{event.message}</p>
      <div className="mt-5 grid gap-px bg-white/10 sm:grid-cols-2">
        <div className="bg-[#0a0a0a] p-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">Bloqueo</p>
          <p className={event.blocked ? "mt-2 font-black text-red-300" : "mt-2 font-black text-primary"}>
            {event.blocked ? "Activo" : "Inactivo"}
          </p>
        </div>
        <div className="bg-[#0a0a0a] p-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">Evento original</p>
          <p className="mt-2 font-mono text-xs text-gray-300">{formatDate(event.occurredAt)}</p>
        </div>
        <div className="bg-[#0a0a0a] p-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">Velocidad</p>
          <p className="mt-2 font-black text-white">{event.speedKmph?.toFixed(1) ?? "0.0"} km/h</p>
        </div>
        <div className="bg-[#0a0a0a] p-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">Geofence</p>
          <p className={event.insideGeofence === false ? "mt-2 font-black text-red-300" : "mt-2 font-black text-primary"}>
            {event.insideGeofence === false ? "Fuera" : "Dentro / pendiente"}
          </p>
        </div>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date(value));
}
