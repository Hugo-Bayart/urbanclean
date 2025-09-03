// src/lib/orderDraft.js
const KEY = "orderDraft";

export const readDraft = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
  catch { return {}; }
};

export const writeDraft = (patch) => {
  const prev = readDraft();
  localStorage.setItem(KEY, JSON.stringify({ ...prev, ...patch }));
};

export const clearDraft = () => {
  localStorage.removeItem(KEY);
};
