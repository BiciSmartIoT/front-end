"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import Link from "next/link";
import { User, Mail, Lock, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../../../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/iam/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Cuenta creada con éxito. Por favor, inicia sesión.");
        router.push("/login");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "No se pudo crear la cuenta"}`);
      }
    } catch (error) {
      alert("Error de conexión con el servidor de autenticación.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-[450px] bg-[#0A0A0A] border border-white/5 p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-sm font-black italic uppercase tracking-[0.2em] mb-1">Create Account</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Join the performance elite</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <InputGroup 
              label="First Name" 
              name="firstName"
              placeholder="ERIK" 
              icon={<User size={14}/>} 
              onChange={handleChange}
            />
            <InputGroup 
              label="Last Name" 
              name="lastName"
              placeholder="VANKAMP" 
              icon={<User size={14}/>} 
              onChange={handleChange}
            />
          </div>

          <InputGroup 
            label="Email Address" 
            name="email"
            placeholder="RACER@VELOCITY.IO" 
            icon={<Mail size={14}/>} 
            type="email" 
            onChange={handleChange}
          />
          
          <InputGroup 
            label="Password" 
            name="password"
            placeholder="••••••••" 
            icon={<Lock size={14}/>} 
            type="password" 
            onChange={handleChange}
          />
          
          <Button type="submit" className="w-full py-7 text-xs italic mt-4" disabled={loading}>
            {loading ? "REGISTERING..." : (
              <span className="flex items-center gap-2">
                START YOUR ENGINE <Zap size={14} className="fill-current" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-10 text-center border-t border-white/5 pt-8">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            Already registered? <Link href="/login" className="text-primary ml-1 hover:text-white">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, name, placeholder, icon, type = "text", onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black uppercase text-gray-400 tracking-tighter">{label}</label>
      <div className="relative flex items-center">
        <input 
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          required
          className="w-full bg-black border border-white/10 p-4 text-xs font-bold uppercase outline-none focus:border-primary transition-all placeholder:text-gray-800 text-white"
        />
        <div className="absolute right-4 text-gray-600">{icon}</div>
      </div>
    </div>
  );
}
