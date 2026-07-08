"use client";

import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Button } from "../../../components/ui/Button";
import Link from "next/link";
import { AtSign, Eye, EyeOff, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      router.push("/select-role");
    } else {
      setError(result.error || "No se pudo iniciar sesion");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6">
      <div className="w-full max-w-[450px] bg-[#0A0A0A] border border-white/5 p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-sm font-black italic uppercase tracking-[0.2em] mb-1">
            Login
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            Access your performance fleet
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="border border-red-500/40 bg-red-500/10 p-3 text-xs font-bold text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-400 tracking-tighter">
              Email Address
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full bg-black border border-white/10 p-4 text-xs font-bold uppercase outline-none focus:border-primary transition-all placeholder:text-gray-800 text-white"
                placeholder="ADMIN@BIKESMARTIOT.COM"
                required
              />
              <AtSign size={14} className="absolute right-4 text-gray-600" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[9px] font-black uppercase text-gray-400 tracking-tighter">
                Password
              </label>
              <button
                type="button"
                className="text-[9px] font-black uppercase text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full bg-black border border-white/10 p-4 pr-12 text-xs font-bold outline-none focus:border-primary transition-all placeholder:text-gray-800 text-white"
                placeholder="********"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 flex h-8 w-8 items-center justify-center border border-white/10 bg-zinc-950 text-gray-300 transition hover:border-primary hover:text-primary"
                aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-7 text-xs italic group"
            disabled={loading}
          >
            {loading ? (
              "PROCESSING..."
            ) : (
              <span className="flex items-center gap-2">
                LOGIN <Zap size={14} className="fill-current" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-10 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-white/5" />
          <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">
            Or connect with
          </span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <SocialButton label="Google" />
          <SocialButton label="Github" />
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
            New to the circuit? <br />
            <Link
              href="/register"
              className="text-primary hover:text-white transition-colors"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button className="flex items-center justify-center gap-2 border border-white/5 bg-transparent py-3 hover:bg-white/5 transition-colors group">
      <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400 group-hover:text-white">
        {label}
      </span>
    </button>
  );
}
