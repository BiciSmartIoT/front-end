
"use client";

import { CreditCard } from "lucide-react";

const mockPayments = [
  {
    id: 1,
    card: "VISA •••• 4242",
    status: "ACTIVE",
  },
  {
    id: 2,
    card: "MASTERCARD •••• 9911",
    status: "BACKUP",
  },
];

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <CreditCard className="text-primary" size={34} />

          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tight">
              Payments
            </h1>

            <p className="text-gray-500 text-xs uppercase mt-2">
              Billing methods and invoices
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {mockPayments.map((payment) => (
            <div
              key={payment.id}
              className="border border-white/10 bg-[#0A0A0A] p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-sm font-black uppercase">
                  {payment.card}
                </h2>
              </div>

              <div className="px-3 py-1 bg-primary text-black text-xs font-black uppercase">
                {payment.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
