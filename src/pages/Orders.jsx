import React from "react";
import { Trash2 } from "lucide-react";
import { useOrders } from "@/store/orders";

const SERVICES = {
  std: "Nettoyage standard",
  deep: "Nettoyage en profondeur",
  move: "Entrée/Sortie",
  office: "Bureaux",
};
const SLOTS = {
  slot1: "08:00 – 10:00",
  slot2: "10:00 – 12:00",
  slot3: "12:00 – 14:00",
  slot4: "14:00 – 16:00",
  slot5: "16:00 – 18:00",
};
const euro = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

export default function Orders() {
  const { orders, deleteOrder } = useOrders();

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-extrabold mb-4">Mes commandes</h1>

      {orders.length === 0 ? (
        <p className="text-sm text-gray-600">Aucune commande pour le moment.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o.id} className="rounded-xl border bg-white p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{o.id}</div>
                  <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <button onClick={() => deleteOrder(o.id)} className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div><span className="text-gray-500">Service: </span>{SERVICES[o.serviceId]}</div>
                <div><span className="text-gray-500">Quand: </span>{o.date} • {SLOTS[o.slotId]}</div>
                <div><span className="text-gray-500">Logement: </span>{o.rooms} p • {o.surface} m²</div>
                <div><span className="text-gray-500">Total: </span><b>{euro(o.price)}</b></div>
              </div>
              {o.address && <div className="mt-1 text-sm"><span className="text-gray-500">Adresse: </span>{o.address}</div>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
