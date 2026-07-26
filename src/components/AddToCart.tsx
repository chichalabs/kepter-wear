"use client";

import { useState } from "react";
import { Check, Minus, Plus } from "@phosphor-icons/react";
import { SIZES, type Size } from "@/types";
import { useCart } from "@/lib/cart";

const MAX_QTY = 10;

export function AddToCart({
  productId,
  sizeLabel,
  addLabel,
  addedLabel,
  inCartLabel,
}: {
  productId: string;
  sizeLabel: string;
  addLabel: string;
  addedLabel: string;
  inCartLabel: string;
}) {
  const { add, items, hydrated } = useCart();
  const [size, setSize] = useState<Size>("M");
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function inCart(s: Size): number {
    return items.find((i) => i.productId === productId && i.size === s)?.qty ?? 0;
  }
  const inCartSelected = hydrated ? inCart(size) : 0;

  function handleAdd() {
    add(productId, size, qty);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div>
      <p className="text-sm text-muted">{sizeLabel}</p>
      <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={sizeLabel}>
        {SIZES.map((s) => {
          const n = hydrated ? inCart(s) : 0;
          return (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={s === size}
              onClick={() => setSize(s)}
              className={`relative min-w-12 rounded-[2px] border px-3 py-2 text-sm font-semibold transition-colors ${
                s === size
                  ? "border-accent bg-accent text-ink"
                  : "border-line text-bone hover:border-muted"
              }`}
            >
              {s}
              {n > 0 && (
                <span
                  aria-label={`${inCartLabel}: ${n}`}
                  className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center bg-green px-1 text-[10px] font-bold text-ink"
                >
                  {n}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="flex h-[50px] w-fit items-center border-2 border-bone">
          <button
            type="button"
            aria-label="−"
            disabled={qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-full w-12 items-center justify-center transition-colors hover:bg-ink-2 disabled:opacity-30"
          >
            <Minus size={16} weight="bold" />
          </button>
          <span className="w-12 text-center text-[15px] font-bold tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            aria-label="+"
            disabled={qty >= MAX_QTY}
            onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
            className="flex h-full w-12 items-center justify-center transition-colors hover:bg-ink-2 disabled:opacity-30"
          >
            <Plus size={16} weight="bold" />
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full items-center justify-center gap-2 btn active:translate-y-px sm:w-auto sm:min-w-56"
        >
          {justAdded ? (
            <>
              <Check size={18} weight="bold" /> {addedLabel}
            </>
          ) : (
            addLabel
          )}
        </button>
      </div>
      {inCartSelected > 0 && (
        <p className="mt-3 text-sm text-muted">
          {inCartLabel} ({size}): {inCartSelected}
        </p>
      )}
    </div>
  );
}
