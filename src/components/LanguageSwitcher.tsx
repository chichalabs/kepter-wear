"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDown } from "@phosphor-icons/react";
import { locales } from "@/lib/i18n/config";
import type { Locale } from "@/types";

const names: Record<Locale, string> = {
  ru: "Русский",
  kk: "Қазақша",
  en: "English",
};

/** Tiny simplified flags, HUF-style locale picker (flag + caret dropdown). */
function Flag({ locale }: { locale: Locale }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 14"
      className="h-[14px] w-[20px] shrink-0 border border-line"
    >
      {locale === "ru" && (
        <>
          <rect width="20" height="14" fill="#fff" />
          <rect y="4.67" width="20" height="4.67" fill="#0039a6" />
          <rect y="9.33" width="20" height="4.67" fill="#d52b1e" />
        </>
      )}
      {locale === "kk" && (
        <>
          <rect width="20" height="14" fill="#00afca" />
          <circle cx="10" cy="7" r="3" fill="#fec50c" />
        </>
      )}
      {locale === "en" && (
        <>
          <rect width="20" height="14" fill="#fff" />
          {[0, 2, 4, 6, 8, 10, 12].map((y) => (
            <rect key={y} y={y} width="20" height="1" fill="#b22234" />
          ))}
          <rect width="9" height="7" fill="#3c3b6e" />
        </>
      )}
    </svg>
  );
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rest = pathname.replace(/^\/(ru|kk|en)(?=\/|$)/, "");

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={names[locale]}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 py-1"
      >
        <Flag locale={locale} />
        <CaretDown
          size={11}
          weight="bold"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute left-0 top-full z-50 mt-1 min-w-[150px] border border-line bg-ink">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}${rest}`}
                aria-current={l === locale ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 text-[12px] font-bold uppercase tracking-[0.025em] hover:bg-ink-2 ${
                  l === locale ? "bg-ink-2" : ""
                }`}
              >
                <Flag locale={l} />
                {names[l]}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
