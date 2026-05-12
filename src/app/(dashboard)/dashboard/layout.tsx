// app/dashboard/layout.tsx
"use client"; 
import { LayoutDashboard, Bike, Settings, LogOut, HistoryIcon, LucideCreditCard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      <aside className="w-64 border-r border-white/5 bg-[#050505] flex flex-col">
      

        <nav className="flex-1 px-4 space-y-2">
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Overview" 
            href="/dashboard/overview" 
            active={pathname === "/dashboard/overview"} 
          />
          <NavItem 
            icon={<Bike size={18} />} 
            label="My Fleet" 
            href="/dashboard/fleet" 
            active={pathname === "/dashboard/fleet"} 
          />
          <NavItem 
            icon={<HistoryIcon size={18} />} 
            label="History" 
            href="/dashboard/history" 
            active={pathname === "/dashboard/history"} 
          />
          <NavItem 
            icon={<LucideCreditCard size={18} />} 
            label="Payments" 
            href="/dashboard/payments" 
            active={pathname === "/dashboard/payments"} 
          />
          <NavItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            href="/dashboard/settings" 
            active={pathname === "/dashboard/settings"} 
          />
        </nav>

        <div className="p-6 border-t border-white/5">
          <button className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest">
            <LogOut size={16} /> Disconnect
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
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