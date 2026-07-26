import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { withBase } from "@/lib/img";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n/types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartButton } from "./CartButton";

/**
 * Two-tier header cloned from hufworldwide.com:
 *   1. thin seasonal color strip
 *   2. grey utility bar (#f5f5f5, 50px): locale left, promo center,
 *      sign-in + bag right
 *   3. white main bar: fat lowercase wordmark, bold uppercase nav,
 *      boxed search on the right; this bar is the sticky one.
 * Sign-in is a visual stub (no auth yet); search submits to the catalog.
 */
export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header>
      <div className="h-[6px] bg-[#4b3d2a]" />

      {/* Utility bar */}
      <div className="relative border-b border-line bg-[#f5f5f5]">
        <div className="mx-auto flex h-[50px] max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <LanguageSwitcher locale={locale} />
          <p className="absolute left-1/2 hidden -translate-x-1/2 text-[13px] font-bold uppercase tracking-[0.025em] lg:block">
            {dict.header.promo}
          </p>
          <CartButton locale={locale} label={dict.nav.cart} />
        </div>
      </div>

      {/* Main bar */}
      <div className="sticky top-0 z-40 bg-ink">
        <div className="mx-auto flex h-[58px] max-w-[1400px] items-center justify-between px-4 sm:h-[76px] sm:px-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href={`/${locale}`} className="block shrink-0">
              <Image
                src={withBase("/logo.png")}
                alt="Kepter"
                width={1280}
                height={538}
                priority
                className="h-[30px] w-auto sm:h-[40px]"
              />
            </Link>
            <nav className="flex items-center text-[14px] font-bold uppercase tracking-[0.01em]">
              <Link
                href={`/${locale}/#catalog`}
                className="px-2.5 py-[10px] hover:underline sm:px-5"
              >
                {dict.nav.shop}
              </Link>
              <Link
                href={`/${locale}/lookbook`}
                className="px-2.5 py-[10px] hover:underline sm:px-5"
              >
                {dict.nav.lookbook}
              </Link>
            </nav>
          </div>
          <form
            action={`/${locale}/#catalog`}
            className="hidden h-[40px] w-[240px] items-center gap-2.5 border border-[#d1d1d1] px-3.5 md:flex"
          >
            <MagnifyingGlass size={17} weight="bold" />
            <input
              type="search"
              name="q"
              placeholder={dict.header.search}
              className="w-full bg-transparent text-[12px] font-bold uppercase tracking-[0.05em] outline-none placeholder:text-bone"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
