"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  alt,
  labels,
}: {
  images: string[];
  alt: string;
  labels: string[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[6/7] w-full overflow-hidden border border-line bg-ink-2">
        <Image
          src={images[active]}
          alt={`${alt}, ${labels[active] ?? ""}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`relative aspect-square w-20 overflow-hidden border transition-colors ${
                i === active ? "border-accent" : "border-line hover:border-muted"
              }`}
            >
              <Image src={src} alt={labels[i] ?? alt} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
