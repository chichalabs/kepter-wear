"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n/config";
import type { Locale } from "@/types";

const labels: Record<Locale, string> = { ru: "Рус", kk: "Қаз", en: "Eng" };

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(ru|kk|en)(?=\/|$)/, "");

  return (
    <nav aria-label="Language" className="flex items-center gap-1 text-sm">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          aria-current={l === locale ? "true" : undefined}
          className={
            l === locale
              ? "px-2 py-1 text-bone underline decoration-accent decoration-2 underline-offset-4"
              : "px-2 py-1 text-muted transition-colors hover:text-bone"
          }
        >
          {labels[l]}
        </Link>
      ))}
    </nav>
  );
}
