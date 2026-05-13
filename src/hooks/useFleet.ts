import { useState, useEffect } from "react";
import { Vehicle, VehicleService } from "../services/vehicle-service";
import { MOCK_DATA } from "../data/vehicles";

export function useFleet(mode: "own" | "all" = "all") {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          mode === "own"
            ? await VehicleService.getOwnFleet()
            : await VehicleService.getAllVehicles();

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