"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { formatKZT } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types";

export function CartView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { items, hydrated, total, setQty, remove } = useCart();

  if (!hydrated) {
    // skeleton matching the final list shape
    return (
      <div className="space-y-3" aria-hidden>
        {[0, 1].map((i) => (
          <div key={i} className="h-24 animate-pulse border border-line bg-ink-2" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="border border-line bg-ink-2 px-6 py-14 text-center">
        <p className="font-display text-lg font-semibold uppercase tracking-wide">
          {dict.cart.empty}
        </p>
        <p className="mt-2 text-sm text-muted">{dict.cart.emptyHint}</p>
        <Link
          href={`/${locale}#catalog`}
          className="mt-6 inline-block rounded-[2px] bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent-press"
        >
          {dict.cart.goToCatalog}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-line border border-line bg-ink-2">
        {items.map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return (
            <li key={`${item.productId}-${item.size}`} className="flex gap-4 p-4">
              <Link
                href={`/${locale}/product/${product.slug}`}
                className="relative block aspect-[6/7] w-20 shrink-0 overflow-hidden border border-line"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name[locale]}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/${locale}/product/${product.slug}`}
                      className="font-display text-sm font-semibold uppercase tracking-wide transition-colors hover:text-accent"
                    >
                      {product.name[locale]}
                    </Link>
                    <p className="mt-1 text-xs text-muted">
                      {dict.cart.size}: {item.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.productId, item.size)}
                    aria-label={dict.cart.remove}
                    className="p-1 text-muted transition-colors hover:text-danger"
                  >
                    <X size={16} weight="bold" />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center border border-line">
                    <button
                      type="button"
                      onClick={() => setQty(item.productId, item.size, item.qty - 1)}
                      aria-label={`${dict.cart.qty} -`}
                      className="px-2.5 py-1.5 text-muted transition-colors hover:text-bone"
                    >
                      <Minus size={14} weight="bold" />
                    </button>
                    <span className="min-w-8 text-center text-sm">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(item.productId, item.size, item.qty + 1)}
                      aria-label={`${dict.cart.qty} +`}
                      className="px-2.5 py-1.5 text-muted transition-colors hover:text-bone"
                    >
                      <Plus size={14} weight="bold" />
                    </button>
                  </div>
                  <span className="text-sm">
                    {formatKZT(product.price * item.qty, locale)}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex flex-col items-end gap-4">
        <p className="text-lg">
          {dict.cart.total}:{" "}
          <span className="font-display font-bold text-accent">
            {formatKZT(total, locale)}
          </span>
        </p>
        <Link
          href={`/${locale}/checkout`}
          className="rounded-[2px] bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent-press active:translate-y-px"
        >
          {dict.cart.checkout}
        </Link>
      </div>
    </div>
  );
}
