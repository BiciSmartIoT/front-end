// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { Zap, User, LogOut, LayoutDashboard, Search, Bike } from "lucide-react"; // Añadí Bike para el Rider
import { useAuth } from "../../contexts/AuthContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Lógica para identificar al Proveedor (el que arrienda sus bicis)
  const isProvider = user?.roles?.includes("ROLE_PROVIDER");

  return (
    <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl fixed top-0 w-full z-[100]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1">
              <Zap className="text-black fill-black" size={18} />
            </div>
            <span className="font-black italic uppercase tracking-tighter text-xl text-white">
              BiciSmart<span className="text-primary"> Iot</span>
            </span>
          </Link>

          {/* NAV CENTRAL DINÁMICO SEGÚN ROL */}
          <div className="hidden md:flex gap-6 border-l border-white/10 pl-8 h-6 items-center text-[9px] font-black uppercase tracking-[0.3em]">
            
            {/* Explore: Visible para todos */}
            <Link 
              href="/explore" 
              className={`${isActive('/explore') ? 'text-primary' : 'text-gray-500 hover:text-white'} transition-colors flex items-center gap-2`}
            >
              <Search size={12} /> Explore
            </Link>

            {/* VISTA PARA EL CLIENTE (RIDER) - Sesión Activa si está alquilando */}
            {user && !isProvider && (
              <Link 
                href="/explore/active-session" 
                className={`${isActive('/explore/active-session') ? 'text-primary' : 'text-gray-500 hover:text-white'} transition-colors flex items-center gap-2`}
              >
                <Bike size={12} /> Current Ride
              </Link>
            )}

            {/* VISTA SOLO PARA EL PROVEEDOR (EL QUE ARRIENDA) */}
            {user && isProvider && (
              <>
                <Link 
                  href="/dashboard/overview" 
                  className={`${pathname.includes('/dashboard/overview') ? 'text-primary' : 'text-gray-500 hover:text-white'} transition-colors flex items-center gap-2`}
                >
                  <LayoutDashboard size={12} /> Console
                </Link>
                <Link 
                  href="/dashboard/fleet" 
                  className={`${pathname.includes('/dashboard/fleet') ? 'text-primary' : 'text-gray-500 hover:text-white'} transition-colors flex items-center gap-2`}
                >
                  Fleet
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ACCIONES DE USUARIO */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                href={isProvider ? "/dashboard/profile" : "/profile"} 
                className={`flex items-center gap-3 px-4 py-2 border transition-all ${
                  pathname.includes('profile') 
                  ? 'border-primary text-primary bg-primary/5' 
                  : 'border-white/10 text-gray-400 hover:border-white hover:text-white'
                }`}
              >
                <div className="w-4 h-4 bg-zinc-800 rounded-full flex items-center justify-center border border-white/20">
                    <User size={10} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {user.email.split('@')[0]}
                </span>
              </Link>

              <button 
                onClick={logout}
                className="p-2 text-gray-500 hover:text-red-500 transition-all"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
              <Link href="/login" className="text-gray-500 hover:text-primary transition-colors">
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-white text-black px-5 py-2.5 italic font-black hover:bg-primary transition-all shadow-[4px_4px_0px_rgba(204,255,0,0.3)]"
              >
                Join Circuit
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}