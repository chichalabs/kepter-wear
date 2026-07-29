"use client";

import { useCallback, useEffect, useState } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";

export interface LookbookShot {
  /** Full (base-path prefixed) image URL */
  src: string;
  /** Tailwind aspect-ratio class for the masonry tile */
  ratio: string;
}

/** Masonry grid with a fullscreen lightbox: click to open, arrows/keys to switch. */
export function LookbookGallery({ shots }: { shots: LookbookShot[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i + shots.length - 1) % shots.length)),
    [shots.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % shots.length)),
    [shots.length]
  );

  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    // Lock page scroll behind the lightbox
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open, prev, next]);

  return (
    <>
      <div className="mt-6 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setOpen(i)}
            className={`${shot.ratio} block w-full cursor-zoom-in overflow-hidden bg-ink-2`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot.src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={() => setOpen(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shots[open].src}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92dvh] max-w-[92vw] object-contain"
          />
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-60"
          >
            <X size={26} weight="bold" />
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white transition-opacity hover:opacity-60 sm:left-6"
          >
            <CaretLeft size={30} weight="bold" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white transition-opacity hover:opacity-60 sm:right-6"
          >
            <CaretRight size={30} weight="bold" />
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[12px] font-bold tracking-[0.1em] text-white">
            {open + 1} / {shots.length}
          </span>
        </div>
      )}
    </>
  );
}
