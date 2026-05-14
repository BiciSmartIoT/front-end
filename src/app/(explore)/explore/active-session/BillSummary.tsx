"use client";
import { Receipt, CreditCard, ChevronRight, Check, ArrowLeft, Smartphone } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import { useState } from "react";

export function BillSummary({ timeLeft }: { timeLeft: number }) {
  const [paymentMethod, setPaymentMethod] = useState("yape");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const minsUsed = Math.ceil((3600 - timeLeft) / 60);
  const baseFare = 15.00;
  const timeFare = minsUsed * 0.50;
  const total = baseFare + timeFare;

  const methods = [
    { id: "yape", label: "Yape", color: "bg-[#742284]" },
    { id: "plin", label: "Plin", color: "bg-[#00d1ce]" },
    { id: "bcp", label: "BCP", color: "bg-[#fbba00]" },
    { id: "interbank", label: "Interbank", color: "bg-[#0039a6]" },
  ];

  const handleConfirm = () => {
    if (phoneNumber.length !== 9) return;
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[#0A0A0A] border border-white/10 p-10 relative overflow-hidden transition-all shadow-2xl">
        

        <Receipt className="absolute -top-10 -right-10 text-primary opacity-5" size={200} />
        
        <div className="relative z-10">

          <div className="flex justify-between items-start mb-10">
            {isEditing && (
              <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white transition-colors">
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="text-center flex-1">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Trip <span className="text-primary">Summary</span></h2>
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em] mt-2">Invoice #VLT-2026</p>
            </div>
          </div>

          <div className="space-y-4 mb-8 border-t border-b border-white/5 py-6">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-zinc-500">Base Unlock Fee</span>
              <span>S/ {baseFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-zinc-500">Usage Time ({minsUsed} min)</span>
              <span>S/ {timeFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-black italic uppercase pt-4">
              <span>Total Pagar</span>
              <span className="text-primary">S/ {total.toFixed(2)}</span>
            </div>
          </div>

          <div className={`transition-all duration-300 overflow-hidden ${isEditing ? "max-h-[300px] mb-8 opacity-100" : "max-h-0 opacity-0"}`}>
            <p className="text-[9px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-4 text-center">Change Payment Method</p>
            <div className="grid grid-cols-2 gap-3">
              {methods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setPaymentMethod(method.id);
                    setIsEditing(false);
                  }}
                  className={`relative p-4 border transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === method.id 
                    ? "border-primary bg-white/5" 
                    : "border-white/5 bg-transparent hover:border-white/20"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${method.color}`} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{method.label}</span>
                  {paymentMethod === method.id && <Check className="absolute top-1 right-1 text-primary" size={10} />}
                </button>
              ))}
            </div>
          </div>

          {!isEditing && (
            <div className="space-y-6 mb-8 animate-in fade-in slide-in-from-bottom-2">
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full bg-zinc-900/30 p-4 border border-white/5 flex items-center justify-between hover:bg-zinc-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="text-primary group-hover:scale-110 transition-transform" size={20} />
                  <div className="text-left">
                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest leading-none mb-1">Method Selected</p>
                    <span className="text-[10px] font-bold italic uppercase tracking-tighter">
                      {paymentMethod.toUpperCase()} Digital Wallet
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-zinc-700" />
              </button>

              <div className="relative">
                <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-2 block">
                  Phone Number
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                  <input 
                    type="tel"
                    maxLength={9}
                    placeholder="999 999 999"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm font-mono tracking-[0.2em] focus:outline-none focus:border-primary transition-colors placeholder:text-zinc-800"
                  />
                </div>
                {phoneNumber.length > 0 && phoneNumber.length < 9 && (
                  <p className="text-[8px] text-red-500 font-bold uppercase mt-2 tracking-tighter">Invalid number format</p>
                )}
              </div>
            </div>
          )}

          <Button 
            onClick={handleConfirm}
            disabled={isProcessing || isEditing || phoneNumber.length !== 9}
            className="w-full py-6 text-[10px] font-black tracking-widest italic uppercase relative overflow-hidden disabled:opacity-30"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Processing Payment...
              </span>
            ) : (
              `Pay S/ ${total.toFixed(2)} with ${paymentMethod}`
            )}
          </Button>
          
          <p className="text-center text-[7px] text-zinc-700 font-bold uppercase mt-6 tracking-[0.3em]">
            Secured by BiciSmart IoT Payment Gateway
          </p>
        </div>
      </div>
    </div>
  );
}