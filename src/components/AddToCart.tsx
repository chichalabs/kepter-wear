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
}: {
  productId: string;
  sizeLabel: string;
  addLabel: string;
  addedLabel: string;
}) {
  const { add } = useCart();
  const [size, setSize] = useState<Size>("M");
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    add(productId, size, qty);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div>
      <p className="text-sm text-muted">{sizeLabel}</p>
      <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={sizeLabel}>
        {SIZES.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={s === size}
            onClick={() => setSize(s)}
            className={`min-w-12 rounded-[2px] border px-3 py-2 text-sm font-semibold transition-colors ${
              s === size
                ? "border-accent bg-accent text-ink"
                : "border-line text-bone hover:border-muted"
            }`}
          >
            {s}
          </button>
        ))}
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
    </div>
  );
}
