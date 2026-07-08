"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Bike, Cpu, Lock, MapPin, Radio, RefreshCw, Save, Unlock, Zap } from "lucide-react";

import { Button } from "../../../../../components/ui/Button";
import { hasAuthToken } from "../../../../../lib/api";
import { IotDeviceConfig, IotDeviceState, IotService } from "../../../../../services/iot-service";
import { Vehicle, VehicleService } from "../../../../../services/vehicle-service";

const DEFAULT_DEVICE_ID = "esp32-demo-01";

export default function FleetDetailPage() {
  return (
    <Suspense fallback={<FleetDetailFallback />}>
      <FleetDetailContent />
    </Suspense>
  );
}

function FleetDetailFallback() {
  return (
    <div className="p-10 text-white">
      <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-500">
        <RefreshCw className="animate-spin text-primary" size={16} />
        Preparando detalle IoT...
      </div>
    </div>
  );
}

function FleetDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vehicleId = searchParams.get("id") || "";

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [activeDeviceId, setActiveDeviceId] = useState(DEFAULT_DEVICE_ID);
  const [config, setConfig] = useState<IotDeviceConfig | null>(null);
  const [state, setState] = useState<IotDeviceState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingDevice, setSavingDevice] = useState(false);
  const [action, setAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deviceIdInput, setDeviceIdInput] = useState(DEFAULT_DEVICE_ID);

  const [form, setForm] = useState({
    speedLimitKmph: 30,
    geofenceCenterLat: -12.0464,
    geofenceCenterLon: -77.0428,
    geofenceRadiusMeters: 100,
  });

  const load = async () => {
    if (!vehicleId) {
      setError("Falta el identificador de la unidad.");
      setLoading(false);
      return;
    }

    if (!hasAuthToken()) {
      setError("Inicia sesion para administrar la unidad IoT.");
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const vehicleData = await VehicleService.getVehicleById(vehicleId);
      const deviceId = vehicleData.deviceId || DEFAULT_DEVICE_ID;
      const [configData, stateData] = await Promise.all([
        IotService.getDeviceConfig(deviceId),
        IotService.getDeviceState(deviceId),
      ]);

      setVehicle(vehicleData);
      setActiveDeviceId(deviceId);
      setDeviceIdInput(deviceId);
      setConfig(configData);
      setState(stateData);
      setForm({
        speedLimitKmph: configData.speedLimitKmph,
        geofenceCenterLat: configData.geofenceCenterLat,
        geofenceCenterLon: configData.geofenceCenterLon,
        geofenceRadiusMeters: configData.geofenceRadiusMeters,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar la unidad.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const timer = setInterval(() => {
      IotService.getDeviceState(activeDeviceId).then(setState).catch(() => null);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeDeviceId, vehicleId]);

  const saveConfig = async () => {
    try {
      setSaving(true);
      setError(null);
      const updated = await IotService.updateDeviceConfig(activeDeviceId, form);
      setConfig(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar la configuracion.");
    } finally {
      setSaving(false);
    }
  };

  const saveDeviceId = async () => {
    if (!vehicleId || !deviceIdInput.trim()) {
      setError("Ingresa un device ID valido para el ESP32.");
      return;
    }

    try {
      setSavingDevice(true);
      setError(null);
      const updatedVehicle = await VehicleService.updateVehicle(vehicleId, {
        deviceId: deviceIdInput.trim(),
      });
      const deviceId = updatedVehicle.deviceId || deviceIdInput.trim();
      const [configData, stateData] = await Promise.all([
        IotService.getDeviceConfig(deviceId),
        IotService.getDeviceState(deviceId),
      ]);
      setVehicle(updatedVehicle);
      setActiveDeviceId(deviceId);
      setConfig(configData);
      setState(stateData);
      setForm({
        speedLimitKmph: configData.speedLimitKmph,
        geofenceCenterLat: configData.geofenceCenterLat,
        geofenceCenterLon: configData.geofenceCenterLon,
        geofenceRadiusMeters: configData.geofenceRadiusMeters,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo asignar el ESP32.");
    } finally {
      setSavingDevice(false);
    }
  };

  const sendCommand = async (type: "LOCK" | "UNLOCK" | "RESET") => {
    try {
      setAction(type);
      setError(null);
      await IotService.sendCommand(activeDeviceId, type, `Comando ${type} desde dashboard`);
      await IotService.getDeviceState(activeDeviceId).then(setState).catch(() => null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar el comando.");
    } finally {
      setAction(null);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-white">
        <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-500">
          <RefreshCw className="animate-spin text-primary" size={16} />
          Cargando unidad IoT...
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-7xl mx-auto text-white">
      <button
        onClick={() => router.push("/dashboard/fleet")}
        className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-primary transition"
      >
        <ArrowLeft size={14} />
        Volver a flota
      </button>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary">Unidad conectada</p>
          <h1 className="mt-2 text-4xl font-black italic uppercase leading-none">
            {vehicle?.title || "Unidad"} <span className="text-primary">IoT</span>
          </h1>
          <p className="text-gray-500 text-[11px] uppercase mt-2 tracking-wider">
            {activeDeviceId} - {vehicle?.status || "STATUS_UNKNOWN"}
          </p>
          {!vehicle?.deviceId && (
            <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-yellow-300/80">
              Esta unidad usa el device ID demo hasta asignar un ESP32 real.
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={() => sendCommand("LOCK")} disabled={action !== null} className="h-11 px-5 text-[10px]">
            <Lock size={13} className="mr-2" />
            Bloquear
          </Button>
          <Button onClick={() => sendCommand("UNLOCK")} disabled={action !== null} variant="outlined" className="h-11 px-5 text-[10px]">
            <Unlock size={13} className="mr-2" />
            Desbloquear
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-px bg-white/10 mb-8 md:grid-cols-4">
        <Metric icon={Radio} label="Edge" value={state ? "Online" : "Sin senal"} tone={state ? "text-primary" : "text-red-300"} />
        <Metric icon={Lock} label="Bloqueo" value={state?.blocked ? "Activo" : "Libre"} tone={state?.blocked ? "text-red-300" : "text-primary"} />
        <Metric icon={Zap} label="Velocidad" value={`${state?.speedKmph?.toFixed(1) ?? "0.0"} km/h`} />
        <Metric icon={MapPin} label="Geofence" value={state?.insideGeofence === false ? "Fuera" : "Dentro"} tone={state?.insideGeofence === false ? "text-red-300" : "text-primary"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <section className="border border-white/10 bg-[#0a0a0a] p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Estado actual</p>
              <h2 className="mt-1 text-2xl font-black uppercase">Telemetria</h2>
            </div>
            <Cpu className="text-primary" size={24} />
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-gray-500">
                ESP32 Device ID
              </label>
              <div className="flex gap-2">
                <input
                  value={deviceIdInput}
                  onChange={(event) => setDeviceIdInput(event.target.value)}
                  className="h-11 min-w-0 flex-1 border border-white/10 bg-black px-3 font-mono text-xs outline-none transition focus:border-primary"
                />
                <Button onClick={saveDeviceId} disabled={savingDevice} className="h-11 px-4 text-[10px]">
                  <Save size={13} className="mr-2" />
                  {savingDevice ? "..." : "ID"}
                </Button>
              </div>
            </div>
            <InfoRow label="Ultimo evento" value={state?.eventType || "Pendiente"} />
            <InfoRow label="Mensaje" value={state?.message || "Esperando eventos del ESP32"} />
            <InfoRow label="Lock state" value={state?.lockState || (state?.blocked ? "LOCKED" : "UNLOCKED")} />
            <InfoRow label="Ubicacion" value={state?.latitude && state?.longitude ? `${state.latitude.toFixed(6)}, ${state.longitude.toFixed(6)}` : "Sin fix GPS"} />
          </div>

          <button
            onClick={() => sendCommand("RESET")}
            disabled={action !== null}
            className="mt-6 w-full border border-white/10 h-11 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:border-primary hover:text-primary transition disabled:opacity-50"
          >
            Reset remoto
          </button>
        </section>

        <section className="border border-white/10 bg-[#0a0a0a] p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Configuracion enviada al ESP32</p>
              <h2 className="mt-1 text-2xl font-black uppercase">Zona y velocidad</h2>
            </div>
            <Bike className="text-primary" size={24} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ConfigInput label="Limite km/h" value={form.speedLimitKmph} onChange={(value) => setForm({ ...form, speedLimitKmph: value })} />
            <ConfigInput label="Radio metros" value={form.geofenceRadiusMeters} onChange={(value) => setForm({ ...form, geofenceRadiusMeters: value })} />
            <ConfigInput label="Centro latitud" value={form.geofenceCenterLat} step="0.000001" onChange={(value) => setForm({ ...form, geofenceCenterLat: value })} />
            <ConfigInput label="Centro longitud" value={form.geofenceCenterLon} step="0.000001" onChange={(value) => setForm({ ...form, geofenceCenterLon: value })} />
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="text-[10px] uppercase tracking-widest text-gray-600">
              Ultima config: {config?.updatedAt ? new Date(config.updatedAt).toLocaleString("es-PE") : "sin registro"}
            </p>
            <Button onClick={saveConfig} disabled={saving} className="h-11 px-5 text-[10px]">
              <Save size={13} className="mr-2" />
              {saving ? "Guardando" : "Guardar"}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, tone = "text-white" }: { icon: any; label: string; value: string; tone?: string }) {
  return (
    <div className="bg-[#0a0a0a] px-5 py-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">{label}</p>
        <Icon size={13} className="text-gray-600" />
      </div>
      <p className={`text-xl font-black uppercase ${tone}`}>{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3 last:border-b-0">
      <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">{label}</span>
      <span className="max-w-[65%] text-right text-xs font-bold uppercase text-gray-300">{value}</span>
    </div>
  );
}

function ConfigInput({
  label,
  value,
  step = "1",
  onChange,
}: {
  label: string;
  value: number;
  step?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-12 w-full border border-white/10 bg-black px-4 font-mono text-sm outline-none transition focus:border-primary"
      />
    </label>
  );
}
