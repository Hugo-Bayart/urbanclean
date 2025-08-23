// src/pages/Orders.jsx
import { useOrders } from "@/store/orders";

export default function Orders() {
  const { orders } = useOrders();
  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Mes commandes</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">Aucune commande pour le moment.</p>
      ) : (
        <ul className="list-disc pl-6">
          {orders.map((o, i) => (
            <li key={i}>{o?.id ?? `Commande #${i + 1}`}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
