import { Vehicle } from "../services/vehicle-service";

export const MOCK_DATA: Vehicle[] = [
  {
    id: "m1",

    title: "Carbon Fiber Pro",

    description: "Elite performance carbon bike",

    hourlyPrice: 25,

    latitude: -12.0464,

    longitude: -77.0428,

    status: "AVAILABLE",

    ratingAvg: 4.9,

    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "m2",

    title: "Mountain Master",

    description: "All-terrain beast",

    hourlyPrice: 15,

    latitude: -12.0500,

    longitude: -77.0300,

    status: "IN_SERVICE",

    ratingAvg: 4.7,

    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "m3",

    title: "Urban Stealth",

    description: "City commuter bike",

    hourlyPrice: 12,

    latitude: -12.0600,

    longitude: -77.0500,

    status: "AVAILABLE",

    ratingAvg: 4.5,

    image:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
  },
];