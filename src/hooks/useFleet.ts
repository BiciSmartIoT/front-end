import { useState, useEffect } from "react";
import { Vehicle, VehicleService } from "../services/vehicle-service";

// En useFleet.ts
const MOCK_DATA: Vehicle[] = [
  { 
    id: "m1", 
    title: "Carbon Fiber Pro", 
    description: "Elite performance", 
    hourlyPrice: 25, 
    status: "AVAILABLE", 
    ratingAvg: 4.9,
    image: "assets/bici1.webp" 
  },
  { 
    id: "m2", 
    title: "Mountain Master", 
    description: "All-terrain beast", 
    hourlyPrice: 15, 
    status: "IN_SERVICE", 
    ratingAvg: 4.7,
    image: "assets/bici2.jpeg"
  },
  { 
    id: "m3", 
    title: "Urban Stealth", 
    description: "City commuter", 
    hourlyPrice: 12, 
    status: "AVAILABLE", 
    ratingAvg: 4.5,
    image: "assets/bici3.png"
  }
];

export function useFleet(mode: "own" | "all" = "all") {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = mode === "own" 
          ? await VehicleService.getOwnFleet() 
          : await VehicleService.getAllVehicles();
        
        // Si el API responde pero no hay datos, usamos mocks
        setVehicles(data.length > 0 ? data : MOCK_DATA);
      } catch (error) {
        setVehicles(MOCK_DATA);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [mode]);

  return { vehicles, loading };
}