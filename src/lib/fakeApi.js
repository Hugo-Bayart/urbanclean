import { loadOrders, saveOrders } from "./storage";

// petit délai pour simuler le réseau
const sleep = (ms = 400) => new Promise(r => setTimeout(r, ms));

export async function createOrder(payload) {
  await sleep(300);
  const orders = loadOrders();
  const id = "ord_" + Math.random().toString(36).slice(2, 9);
  const now = new Date().toISOString();
  const order = { id, status: "pending", createdAt: now, ...payload };
  orders.unshift(order);
  saveOrders(orders);
  return order;
}

export async function listOrders() {
  await sleep(200);
  return loadOrders();
}

export async function cancelOrder(id) {
  await sleep(250);
  const updated = loadOrders().map(o =>
    o.id === id ? { ...o, status: "canceled" } : o
  );
  saveOrders(updated);
  return updated.find(o => o.id === id);
}
