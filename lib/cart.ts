"use client";
import { useSyncExternalStore } from "react";
import { bySlug, DELIVERY, type DeliveryKey } from "./data";

// Statische site: winkelmand en bestelling leven in localStorage.
export type CartLine = { slug: string; size: string; qty: number };
export type CheckoutInfo = {
  naam: string; email: string; telefoon: string;
  straat: string; postcode: string; gemeente: string; land: string;
  levering: DeliveryKey; opmerking: string;
};
export type Order = { nr: string; datum: string; lines: CartLine[]; info: CheckoutInfo; subtotal: number; shipping: number; total: number };

const KEYS = { cart: "tibe-cart", info: "tibe-checkout", order: "tibe-order" } as const;
const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string | null; value: unknown }>();

function read<T>(key: string, fallback: T): T {
  let raw: string | null = null;
  try { raw = localStorage.getItem(key); } catch {}
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T;
  let value: T = fallback;
  try { if (raw) value = JSON.parse(raw); } catch {}
  cache.set(key, { raw, value });
  return value;
}
function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {}
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = () => l();
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(l); window.removeEventListener("storage", onStorage); };
}

const EMPTY: CartLine[] = [];
export function useCart() {
  return useSyncExternalStore(subscribe, () => read(KEYS.cart, EMPTY), () => EMPTY);
}
export function useCheckoutInfo() {
  return useSyncExternalStore(subscribe, () => read<CheckoutInfo | null>(KEYS.info, null), () => null);
}
export function useOrder() {
  return useSyncExternalStore(subscribe, () => read<Order | null>(KEYS.order, null), () => null);
}

export const cart = {
  add(slug: string, size: string, qty = 1) {
    const lines = [...read(KEYS.cart, EMPTY)];
    const i = lines.findIndex((l) => l.slug === slug && l.size === size);
    if (i >= 0) lines[i] = { ...lines[i], qty: Math.min(9, lines[i].qty + qty) };
    else lines.push({ slug, size, qty });
    write(KEYS.cart, lines);
  },
  setQty(index: number, qty: number) {
    const lines = [...read(KEYS.cart, EMPTY)];
    if (!lines[index]) return;
    if (qty <= 0) lines.splice(index, 1);
    else lines[index] = { ...lines[index], qty: Math.min(9, qty) };
    write(KEYS.cart, lines);
  },
  setSize(index: number, size: string) {
    const lines = [...read(KEYS.cart, EMPTY)];
    if (!lines[index]) return;
    lines[index] = { ...lines[index], size };
    write(KEYS.cart, lines);
  },
  remove(index: number) { this.setQty(index, 0); },
  clear() { write(KEYS.cart, null); },
  saveInfo(info: CheckoutInfo) { write(KEYS.info, info); },
  saveOrder(order: Order) { write(KEYS.order, order); },
};

export function totals(lines: CartLine[], levering: DeliveryKey = "standaard") {
  const subtotal = lines.reduce((s, l) => s + (bySlug(l.slug)?.price ?? 0) * l.qty, 0);
  const d = DELIVERY[levering];
  const shipping = lines.length === 0 || subtotal >= d.freeFrom ? 0 : d.price;
  return { subtotal, shipping, total: subtotal + shipping, count: lines.reduce((s, l) => s + l.qty, 0) };
}
