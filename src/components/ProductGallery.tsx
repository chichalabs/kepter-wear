"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { withBase } from "@/lib/img";

const ZOOM = 2.5;
const LENS = 200; // lens diameter, px

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
  const boxRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  // The lens is driven imperatively (no state) so mousemove never re-renders.
  // The zoomed layer is a clone of the container scaled by ZOOM with the same
  // object-cover crop, shifted so the cursor point sits at the lens center.
  function moveLens(e: React.MouseEvent) {
    const box = boxRef.current;
    const lens = lensRef.current;
    const zoom = zoomRef.current;
    if (!box || !lens || !zoom) return;
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lens.style.left = `${x - LENS / 2}px`;
    lens.style.top = `${y - LENS / 2}px`;
    zoom.style.width = `${rect.width * ZOOM}px`;
    zoom.style.height = `${rect.height * ZOOM}px`;
    zoom.style.transform = `translate(${LENS / 2 - x * ZOOM}px, ${
      LENS / 2 - y * ZOOM
    }px)`;
  }

  function setLensVisible(visible: boolean) {
    if (lensRef.current) {
      lensRef.current.style.display = visible ? "block" : "none";
    }
  }

  return (
    <div>
      <div
        ref={boxRef}
        onMouseEnter={() => setLensVisible(true)}
        onMouseLeave={() => setLensVisible(false)}
        onMouseMove={moveLens}
        className="relative aspect-[6/7] w-full cursor-zoom-in overflow-hidden border border-line bg-ink-2"
      >
        <Image
          src={withBase(images[active])}
          alt={`${alt}, ${labels[active] ?? ""}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div
          ref={lensRef}
          style={{ display: "none", width: LENS, height: LENS }}
          className="pointer-events-none absolute z-10 overflow-hidden rounded-full border-2 border-bone bg-ink-2 shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
        >
          <div ref={zoomRef} className="relative">
            <Image
              src={withBase(images[active])}
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
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
              <Image src={withBase(src)} alt={labels[i] ?? alt} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
