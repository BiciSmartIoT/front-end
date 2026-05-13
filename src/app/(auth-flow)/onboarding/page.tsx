"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/Button";
import { apiFetch } from "../../../lib/api"; 
import {  Clock, Zap } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

export default function OnboardingPage() {
  const router = useRouter();
  const { token } = useAuth(); 
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    docType: "DNI",
    docNumber: ""
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await apiFetch("/providing/me");
        if (res && res.status === "PENDING") {
          setStep(2); // Ya está en revisión
        } else if (res && res.status === "APPROVED") {
          router.push("/dashboard"); // Ya está aprobado
        }
      } catch (err) {
        console.log("No provider profile yet");
      }
    };
    if (token) checkStatus();
  }, [token, router]);
const handleOnboarding = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  setLoading(true);

  try {

    // STEP 1
    // convertir usuario a provider

    await apiFetch(
      "/iam/providers/onboard",
      {
        method: "POST",
      }
    );

 
    await apiFetch(
      "/providing/onboarding",
      {
        method: "POST",

        body: JSON.stringify({

          displayName:
            formData.displayName,

          phone:
            formData.phone.replace(
              /\s/g,
              ""
            ),

          docType:
            formData.docType,

          docNumber:
            formData.docNumber,
        }),
      }
    );

 

    setStep(2);

  } catch (error: any) {

    console.error(error);

    alert(
      error.message ||
        "Onboarding failed"
    );

  } finally {

    setLoading(false);
  }
};
  if (step === 2) return <SuccessState />;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-[#0A0A0A] border border-white/5 p-12 shadow-2xl">
        <header className="mb-10 text-center">
          <Zap className="text-primary mx-auto mb-4" size={32} />
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Identity Verification</h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-2">
            Complete the KYC process to start hosting machines.
          </p>
        </header>

        <form onSubmit={handleOnboarding} className="space-y-8">
          <OnboardingInput 
            label="Public Shop Name" 
            placeholder="BRUNO BIKES SAC" 
            value={formData.displayName}
            onChange={(v: string) => setFormData({...formData, displayName: v})}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <OnboardingInput 
              label="Contact Phone" 
              placeholder="+51 900..." 
              value={formData.phone}
              onChange={(v: string) => setFormData({...formData, phone: v})}
            />
             <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-400">Doc Type</label>
                <select 
                  className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white outline-none focus:border-primary appearance-none"
                  value={formData.docType}
                  onChange={(e) => setFormData({...formData, docType: e.target.value})}
                >
                  <option value="DNI">DNI (Persona Natural)</option>
                  <option value="RUC">RUC (Empresa)</option>
                </select>
             </div>
          </div>
          <OnboardingInput 
            label="Document Number" 
            placeholder="44556677" 
            value={formData.docNumber}
            onChange={(v: string) => setFormData({...formData, docNumber: v})}
          />

          <Button type="submit" className="w-full py-8 text-sm italic" disabled={loading}>
            {loading ? "ENCRYPTING & SENDING..." : "SUBMIT FOR APPROVAL"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        <Clock size={80} className="text-primary mx-auto mb-4 opacity-50" />
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">Solicitud Recibida</h2>
        
        <div className="bg-[#0A0A0A] border border-white/5 p-8 space-y-4">
          <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest">
            Tus datos de proveedor están siendo revisados por nuestros comisarios.
          </p>
          <div className="h-px bg-white/10 w-full" />
          <p className="text-[11px] font-black uppercase text-primary tracking-[0.3em]">
            TIEMPO ESTIMADO: 1 A 15 DÍAS HÁBILES
          </p>
        </div>

        <p className="text-[9px] text-gray-600 uppercase font-bold">
          Te notificaremos vía email cuando tu cuenta sea <span className="text-white">APPROVED</span>.
        </p>

        <Button onClick={() => window.location.href='/explore'} variant="outlined" className="w-full py-6 text-[10px] tracking-[0.2em]">
          VOLVER AL DASHBOARD COMO RIDER
        </Button>
      </div>
    </div>
  );
}

function OnboardingInput({ label, placeholder, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black uppercase text-gray-400 tracking-tighter">{label}</label>
      <input 
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-white/10 p-4 text-xs font-bold uppercase outline-none focus:border-primary transition-all"
      />
    </div>
  );
}