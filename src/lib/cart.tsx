"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { CartItem, Size } from "@/types";
import { SIZES } from "@/types";
import { getProduct } from "@/lib/products";

const STORAGE_KEY = "kepter-cart:v1";
const MAX_QTY = 10;

type CartAction =
  | { type: "ADD"; productId: string; size: Size; qty: number }
  | { type: "SET_QTY"; productId: string; size: Size; qty: number }
  | { type: "REMOVE"; productId: string; size: Size }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function reducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find(
        (i) => i.productId === action.productId && i.size === action.size,
      );
      if (existing) {
        return state.map((i) =>
          i === existing
            ? { ...i, qty: Math.min(i.qty + action.qty, MAX_QTY) }
            : i,
        );
      }
      return [
        ...state,
        { productId: action.productId, size: action.size, qty: Math.min(action.qty, MAX_QTY) },
      ];
    }
    case "SET_QTY": {
      if (action.qty < 1) {
        return state.filter(
          (i) => !(i.productId === action.productId && i.size === action.size),
        );
      }
      return state.map((i) =>
        i.productId === action.productId && i.size === action.size
          ? { ...i, qty: Math.min(action.qty, MAX_QTY) }
          : i,
      );
    }
    case "REMOVE":
      return state.filter(
        (i) => !(i.productId === action.productId && i.size === action.size),
      );
    case "CLEAR":
      return [];
    case "HYDRATE":
      return action.items;
  }
}

function sanitize(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const items: CartItem[] = [];
  for (const entry of raw) {
    if (typeof entry !== "object" || entry === null) continue;
    const { productId, size, qty } = entry as Record<string, unknown>;
    if (typeof productId !== "string" || !getProduct(productId)) continue;
    if (typeof size !== "string" || !(SIZES as readonly string[]).includes(size)) continue;
    if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1) continue;
    items.push({ productId, size: size as Size, qty: Math.min(qty, MAX_QTY) });
  }
  return items;
}

interface CartContextValue {
  items: CartItem[];
  /** false until localStorage has been read; gate badges on it to avoid SSR mismatch */
  hydrated: boolean;
  count: number;
  total: number;
  add: (productId: string, size: Size, qty?: number) => void;
  setQty: (productId: string, size: Size, qty: number) => void;
  remove: (productId: string, size: Size) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: sanitize(JSON.parse(raw)) });
    } catch {
      // corrupted storage: start with an empty cart
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full or unavailable: cart still works in-memory
    }
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const total = items.reduce((sum, i) => {
      const product = getProduct(i.productId);
      return sum + (product ? product.price * i.qty : 0);
    }, 0);
    return {
      items,
      hydrated,
      count,
      total,
      add: (productId, size, qty = 1) => dispatch({ type: "ADD", productId, size, qty }),
      setQty: (productId, size, qty) => dispatch({ type: "SET_QTY", productId, size, qty }),
      remove: (productId, size) => dispatch({ type: "REMOVE", productId, size }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [items, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
