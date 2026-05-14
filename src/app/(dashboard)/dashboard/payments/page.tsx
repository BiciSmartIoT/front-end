"use client";

import { useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Landmark,
  Smartphone,
} from "lucide-react";

import { Button } from "../../../../components/ui/Button";

interface PaymentMethod {
  id: number;
  type: string;
  value: string;
  status: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] =
    useState<PaymentMethod[]>([
      {
        id: 1,
        type: "BCP",
        value: "19********",
        status: "ACTIVE",
      },
      {
        id: 2,
        type: "YAPE",
        value: "98******21",
        status: "BACKUP",
      },
    ]);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [newPayment, setNewPayment] =
    useState({
      type: "BCP",
      value: "",
    });

  const handleAddPayment = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    let formattedValue = "";

    // BANKS
    if (
      newPayment.type === "BCP" ||
      newPayment.type ===
        "INTERBANK"
    ) {
      formattedValue =
        newPayment.value.slice(
          0,
          2
        ) + "********";
    }

    // PHONE
    if (
      newPayment.type === "YAPE" ||
      newPayment.type === "PLIN"
    ) {
      formattedValue =
        newPayment.value.slice(
          0,
          2
        ) +
        "******" +
        newPayment.value.slice(-2);
    }

    const payment: PaymentMethod = {
      id: Date.now(),
      type: newPayment.type,
      value: formattedValue,
      status: "BACKUP",
    };

    setPayments([
      ...payments,
      payment,
    ]);

    setNewPayment({
      type: "BCP",
      value: "",
    });

    setShowAddModal(false);
  };

  const handleDelete = (
    id: number
  ) => {
    setPayments(
      payments.filter(
        (payment) =>
          payment.id !== id
      )
    );
  };

  return (
    <div className="p-10 max-w-7xl mx-auto text-white">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black italic uppercase leading-none">
            Payments
          </h1>

          <p className="text-gray-500 text-[11px] uppercase mt-2 tracking-wider">
            Billing Methods
          </p>
        </div>

        <Button
          className="px-6 h-12 text-[11px] tracking-[0.15em]"
          onClick={() =>
            setShowAddModal(true)
          }
        >
          <Plus
            size={14}
            className="mr-2"
          />
          Add Method
        </Button>
      </div>

      <div className="border border-white/10">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="px-5 py-4 border-b border-white/10 last:border-b-0 flex items-center justify-between hover:bg-white/[0.02] transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                {payment.type ===
                  "YAPE" ||
                payment.type ===
                  "PLIN" ? (
                  <Smartphone
                    size={14}
                  />
                ) : (
                  <Landmark
                    size={14}
                  />
                )}
              </div>

              <div>
                <h2 className="font-black text-[15px] uppercase tracking-tight">
                  {payment.type}
                </h2>

                <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-wider">
                  {payment.value}
                </p>
              </div>

              <div className="bg-primary text-black px-2 py-1 text-[9px] font-black uppercase tracking-wider">
                {payment.status}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition">
                <Pencil size={13} />
              </button>

              <button
                onClick={() =>
                  handleDelete(
                    payment.id
                  )
                }
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center pt-24 px-4">
          <div className="bg-[#050505] border border-white/10 p-8 w-full max-w-lg h-fit relative">
            <button
              onClick={() =>
                setShowAddModal(false)
              }
              className="absolute top-5 right-5 text-zinc-500 hover:text-white transition"
            >
              <X size={18} />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-black italic uppercase">
                Add{" "}
                <span className="text-primary">
                  Method
                </span>
              </h2>

              <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-2">
                Payment Registration
              </p>
            </div>

            <form
              onSubmit={
                handleAddPayment
              }
              className="space-y-5"
            >
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">
                  Method Type
                </label>

                <select
                  className="w-full bg-transparent border border-white/10 p-4 text-sm uppercase outline-none focus:border-primary"
                  value={
                    newPayment.type
                  }
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      type:
                        e.target.value,
                    })
                  }
                >
                  <option
                    value="BCP"
                    className="bg-black"
                  >
                    BCP
                  </option>

                  <option
                    value="INTERBANK"
                    className="bg-black"
                  >
                    INTERBANK
                  </option>

                  <option
                    value="YAPE"
                    className="bg-black"
                  >
                    YAPE
                  </option>

                  <option
                    value="PLIN"
                    className="bg-black"
                  >
                    PLIN
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">
                  {newPayment.type ===
                    "YAPE" ||
                  newPayment.type ===
                    "PLIN"
                    ? "Phone Number"
                    : "Account Number"}
                </label>

                <input
                  required
                  placeholder={
                    newPayment.type ===
                      "YAPE" ||
                    newPayment.type ===
                      "PLIN"
                      ? "987654321"
                      : "191234567890"
                  }
                  className="w-full bg-transparent border border-white/10 p-4 text-sm uppercase outline-none focus:border-primary"
                  value={
                    newPayment.value
                  }
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      value:
                        e.target.value,
                    })
                  }
                />
              </div>

      
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    setShowAddModal(
                      false
                    )
                  }
                  className="flex-1 border border-white/10 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition"
                >
                  Cancel
                </button>

                <Button
                  type="submit"
                  className="flex-1 py-4 text-[10px] tracking-[0.2em]"
                >
                  Save Method
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}