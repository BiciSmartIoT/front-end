"use client";
import { useRouter } from "next/navigation";
import { Navigation, Zap } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { useAuth } from "../../../contexts/AuthContext";

export default function SelectRolePage() {
  const router = useRouter();
  const { isLoading } = useAuth(); 

  // COMENTADO TEMPORALMENTE PARA PROBAR:
  /*
  useEffect(() => {
    const token = localStorage.getItem('bicesmartiot_token'); 
    if (!token && !isLoading) {
      router.replace('/login');
    }
  }, [isLoading, router]);
  */

  if (isLoading) return <div className="bg-black min-h-screen flex items-center justify-center"><Zap className="animate-pulse text-primary"/></div>;
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">   <h1 className="text-4xl font-black italic uppercase mb-4 tracking-tighter text-white">
        Choose your Path
      </h1>
      <p className="text-gray-500 uppercase text-[10px] font-black tracking-[0.3em] mb-12">
        How do you want to use BiceSmartIoT today?
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="group border border-white/5 bg-[#0A0A0A] p-10 hover:border-primary transition-all cursor-pointer">
          <Zap className="text-primary mb-6" size={40} />
          <h2 className="text-2xl font-black italic uppercase mb-2">Rider</h2>
          <p className="text-gray-500 text-xs mb-8">
            Access the elite fleet and start your session instantly.
          </p>
          <Button 
            className="w-full" 
            onClick={() => router.push('/explore')} 
          >
            Explore Fleet
          </Button>
        </div>

        <div className="group border border-white/5 bg-[#0A0A0A] p-10 hover:border-primary transition-all cursor-pointer">
          <Navigation className="text-primary mb-6" size={40} />
          <h2 className="text-2xl font-black italic uppercase mb-2">Provider</h2>
          <p className="text-gray-500 text-xs mb-8">
            Register your machine and start generating power/revenue.
          </p>
          <Button 
            variant="outlined" 
            className="w-full" 
            onClick={() => router.push('/onboarding')}
          >
            Start Onboarding
          </Button>
        </div>
      </div>
    </div>
  );
}
