const KEY = "uc_orders_v1";

export function loadOrders() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; }
  catch { return []; }
}

export function saveOrders(orders) {
  localStorage.setItem(KEY, JSON.stringify(orders));
}
