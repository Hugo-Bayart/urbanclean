// src/store/orders.jsx
import { createContext, useContext, useState, useMemo } from "react";

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => setOrders((prev) => [...prev, order]);
  const clearOrders = () => setOrders([]);

  const value = useMemo(() => ({ orders, addOrder, clearOrders }), [orders]);
  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within an OrdersProvider");
  return ctx;
}
