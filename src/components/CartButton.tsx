"use client";

import Link from "next/link";
import { Tote } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart";
import type { Locale } from "@/types";

export function CartButton({ locale, label }: { locale: Locale; label: string }) {
  const { count, hydrated } = useCart();

  return (
    <Link
      href={`/${locale}/cart`}
      aria-label={label}
      className="relative flex items-center gap-2 px-2 py-1 text-bone transition-colors hover:text-accent"
    >
      <Tote size={22} weight="regular" />
      <span className="hidden sm:inline text-sm">{label}</span>
      {hydrated && count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-[2px] bg-accent px-1 text-[10px] font-bold text-ink">
          {count}
        </span>
      )}
    </Link>
  );
}
