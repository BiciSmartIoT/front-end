"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Power,
  Cpu,
  Camera,
  X,
  MapPin,
} from "lucide-react";

import { Button } from "../../../../components/ui/Button";

import {
  VehicleService,
  Vehicle,
} from "../../../../services/vehicle-service";

const mockBikeImages = [
  "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=1200&auto=format&fit=crop",
];

export default function FleetPage() {
  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showRegister, setShowRegister] =
    useState(false);

  const [showActivation, setShowActivation] =
    useState(false);

  const [selectedBike, setSelectedBike] =
    useState<Vehicle | null>(null);

  const [newVehicle, setNewVehicle] =
    useState({
      title: "",
      description: "",
      hourlyPrice: 0,
      latitude: -12.0464,
      longitude: -77.0428,
    });

  const fetchVehicles = async () => {
    try {
      const data =
        await VehicleService.getOwnFleet();

      if (Array.isArray(data)) {
        setVehicles(data);
      } else {
        setVehicles([]);
      }
    } catch (err) {
      console.error(err);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAddVehicle = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await VehicleService.createVehicle({
        title: newVehicle.title,
        description:
          newVehicle.description,
        hourlyPrice:
          newVehicle.hourlyPrice,
        latitude: newVehicle.latitude,
        longitude:
          newVehicle.longitude,
      });

      setShowRegister(false);

      setNewVehicle({
        title: "",
        description: "",
        hourlyPrice: 0,
        latitude: -12.0464,
        longitude: -77.0428,
      });

      fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("Error creating vehicle");
    }
  };

  const handleOpenActivation = (
    bike: Vehicle
  ) => {
    setSelectedBike(bike);
    setShowActivation(true);
  };

  if (loading) {
    return (
      <div className="p-10 text-primary">
        Loading fleet...
      </div>
    );
  }

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-5xl font-black italic uppercase">
            My{" "}
            <span className="text-primary">
              Fleet
            </span>
          </h1>

          <p className="text-gray-500 text-xs uppercase mt-2">
            {vehicles.length} Units Online
          </p>
        </div>

        <Button
          className="px-8"
          onClick={() =>
            setShowRegister(true)
          }
        >
          <Plus
            size={18}
            className="mr-2"
          />
          Add Machine
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((bike, index) => (
          <div
            key={bike.id}
            className="border border-white/10 bg-[#0A0A0A] p-6"
          >
            <div className="overflow-hidden mb-6 bg-zinc-900 aspect-video">
             <img
  src={
    mockBikeImages[
      index %
        mockBikeImages.length
    ]
  }
  alt={bike.title}
  className="w-full h-full object-cover"
/>
            </div>

            <div className="flex justify-between mb-4">
              <h3 className="font-black text-xl uppercase">
                {bike.title}
              </h3>

              <div className="text-xs px-2 py-1 bg-primary text-black">
                {bike.status}
              </div>
            </div>

            <p className="text-gray-500 text-sm mb-4">
              {bike.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
              <MapPin size={14} />
              {bike.latitude},{" "}
              {bike.longitude}
            </div>

            <div className="flex justify-between items-center">
              <span className="font-black text-primary">
                ${bike.hourlyPrice}/h
              </span>

              <button
                onClick={() =>
                  handleOpenActivation(
                    bike
                  )
                }
                className="p-2 border border-white/10 hover:border-primary"
              >
                <Power size={16} />
              </button>
            </div>
          </div>
        ))}

        {vehicles.length === 0 && (
          <div className="border border-dashed border-white/10 p-10 text-center">
            <Cpu className="mx-auto mb-4 opacity-30" />

            No vehicles detected
          </div>
        )}
      </div>

      {showRegister && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#050505] border border-white/10 p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-black uppercase">
                  Add Machine
                </h2>

                <p className="text-gray-500 text-xs uppercase mt-2">
                  Quick vehicle setup
                </p>
              </div>

              <button
                onClick={() =>
                  setShowRegister(false)
                }
              >
                <X />
              </button>
            </div>

            <form
              onSubmit={handleAddVehicle}
              className="space-y-4"
            >
              <input
                required
                placeholder="Bike title"
                className="w-full bg-black border border-white/10 p-4 outline-none focus:border-primary"
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    title:
                      e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Description"
                className="w-full bg-black border border-white/10 p-4 h-24 outline-none focus:border-primary"
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    description:
                      e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Hourly price"
                className="w-full bg-black border border-white/10 p-4 outline-none focus:border-primary"
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    hourlyPrice: Number(
                      e.target.value
                    ),
                  })
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="0.0001"
                  placeholder="Latitude"
                  className="w-full bg-black border border-white/10 p-4 outline-none focus:border-primary"
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      latitude: Number(
                        e.target.value
                      ),
                    })
                  }
                />

                <input
                  type="number"
                  step="0.0001"
                  placeholder="Longitude"
                  className="w-full bg-black border border-white/10 p-4 outline-none focus:border-primary"
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      longitude: Number(
                        e.target.value
                      ),
                    })
                  }
                />
              </div>

              <div className="flex gap-4 pt-2">
                <Button
                  type="button"
                  variant="outlined"
                  className="flex-1"
                  onClick={() =>
                    setShowRegister(false)
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="flex-1"
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showActivation &&
        selectedBike && (
          <ActivationModal
            bike={selectedBike}
            onClose={() =>
              setShowActivation(false)
            }
          />
        )}
    </div>
  );
}

function ActivationModal({
  bike,
  onClose,
}: {
  bike: Vehicle;
  onClose: () => void;
}) {
  const [images, setImages] =
    useState<File[]>([]);

  const [uploading, setUploading] =
    useState(false);

  const handleFiles = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    setImages(
      Array.from(e.target.files)
    );
  };

  const handleActivate =
    async () => {
      if (images.length < 2) {
        alert(
          "Minimum 2 images required"
        );
        return;
      }

      try {
        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "vehicleId",
          String(bike.id)
        );

        images.forEach((image) => {
          formData.append(
            "images",
            image
          );
        });

        await fetch(
          "http://localhost:8080/api/vehicles/activate",
          {
            method: "POST",
            body: formData,
          }
        );

        alert("Vehicle activated");

        onClose();
      } catch (err) {
        console.error(err);
        alert("Activation failed");
      } finally {
        setUploading(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-[#050505] border border-white/10 p-8 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black uppercase">
            Activate {bike.title}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Upload minimum 2 real photos
        </p>

        <label className="border-2 border-dashed border-white/10 p-10 flex flex-col items-center cursor-pointer hover:border-primary transition-all">
          <Camera className="mb-4 opacity-40" />

          <span>Upload Images</span>

          <input
            type="file"
            multiple
            className="hidden"
            accept="image/*"
            onChange={handleFiles}
          />
        </label>

        <div className="mt-4 text-sm text-gray-400">
          {images.length} images
          selected
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {images.map(
            (image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(
                  image
                )}
                alt="preview"
                className="w-full h-32 object-cover border border-white/10"
              />
            )
          )}
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            variant="outlined"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="flex-1"
            disabled={
              images.length < 2 ||
              uploading
            }
            onClick={
              handleActivate
            }
          >
            {uploading
              ? "Uploading..."
              : "Activate"}
          </Button>
        </div>
      </div>
    </div>
  );
}