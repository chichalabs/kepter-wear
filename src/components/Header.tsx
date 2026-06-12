import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n/types";
import { KepterMark } from "./Ornament";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartButton } from "./CartButton";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-bone transition-colors hover:text-accent"
        >
          <KepterMark className="h-7 w-7 text-accent" />
          <span className="font-display text-sm font-extrabold uppercase tracking-[0.2em]">
            Kepter Wear
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-5">
          <LanguageSwitcher locale={locale} />
          <CartButton locale={locale} label={dict.nav.cart} />
        </div>
      </div>
    </header>
  );
}
