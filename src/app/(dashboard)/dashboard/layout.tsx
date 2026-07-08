"use client"; 
import { LayoutDashboard, Bike, Settings, LogOut, HistoryIcon, LucideCreditCard, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      <aside className="w-64 border-r border-white/5 bg-[#050505] flex flex-col fixed bottom-0 left-0 top-20 z-40">
        <div className="px-6 py-6 border-b border-white/5">
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-primary">Provider</p>
          <h2 className="mt-2 text-xl font-black italic uppercase">Control Room</h2>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-2">
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Overview" 
            href="/dashboard/overview" 
            active={pathname === "/dashboard" || pathname === "/dashboard/overview"} 
          />
          <NavItem 
            icon={<Bike size={18} />} 
            label="My Fleet" 
            href="/dashboard/fleet" 
            active={pathname.startsWith("/dashboard/fleet")} 
          />
          <NavItem 
            icon={<HistoryIcon size={18} />} 
            label="History" 
            href="/dashboard/history" 
            active={pathname.startsWith("/dashboard/history")} 
          />
          <NavItem 
            icon={<LucideCreditCard size={18} />} 
            label="Payments" 
            href="/dashboard/payments" 
            active={pathname.startsWith("/dashboard/payments")} 
          />
          <NavItem 
            icon={<User size={18} />} 
            label="Profile" 
            href="/dashboard/profile" 
            active={pathname.startsWith("/dashboard/profile")} 
          />
          <NavItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            href="/dashboard/settings" 
            active={pathname.startsWith("/dashboard/settings")} 
          />
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={logout} className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest">
            <LogOut size={16} /> Disconnect
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 flex flex-col min-h-[calc(100vh-5rem)] overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-black">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, href, active = false }: { icon: any, label: string, href: string, active?: boolean }) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-300 border-l-2 ${
        active 
        ? 'bg-primary/10 text-primary border-primary' 
        : 'text-gray-500 hover:text-white hover:bg-white/5 border-transparent'
      }`}>
        {icon}
        <span className="text-[10px] uppercase font-black tracking-widest">{label}</span>
      </div>
    </Link>
  );
}
