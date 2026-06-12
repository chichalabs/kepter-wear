"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

/** Clears the cart once, after a confirmed-successful payment redirect. */
export function ClearCart() {
  const { hydrated, count, clear } = useCart();

  useEffect(() => {
    if (hydrated && count > 0) clear();
  }, [hydrated, count, clear]);

  return null;
}
