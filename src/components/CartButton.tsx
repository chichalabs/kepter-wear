"use client";

import Link from "next/link";
import { BagSimple } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart";
import type { Locale } from "@/types";

export function CartButton({ locale, label }: { locale: Locale; label: string }) {
  const { count, hydrated } = useCart();

  return (
    <Link
      href={`/${locale}/cart`}
      aria-label={label}
      className="relative flex items-center p-1 text-bone transition-opacity hover:opacity-60"
    >
      <BagSimple size={22} weight="regular" />
      {hydrated && count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center bg-bone px-1 text-[10px] font-bold text-ink">
          {count}
        </span>
      )}
    </Link>
  );
}
