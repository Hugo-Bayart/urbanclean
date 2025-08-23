import React, { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem("uc_orders") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("uc_orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => setOrders((prev) => [order, ...prev]);
  const deleteOrder = (id) => setOrders((prev) => prev.filter((o) => o.id !== id));

  return (
    <OrdersContext.Provider value={{ orders, addOrder, deleteOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
