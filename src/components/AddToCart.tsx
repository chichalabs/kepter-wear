"use client";

import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import { SIZES, type Size } from "@/types";
import { useCart } from "@/lib/cart";

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
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    add(productId, size);
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
      <button
        type="button"
        onClick={handleAdd}
        className="mt-6 flex w-full items-center justify-center gap-2 btn active:translate-y-px sm:w-auto sm:min-w-56"
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
  );
}
