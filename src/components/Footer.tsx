import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n/types";
import { infoPages } from "@/lib/infoPages";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-muted">{dict.footer.tagline}</p>
          <p className="mt-3 text-sm text-muted">
            {dict.footer.contacts}:{" "}
            <a
              href="mailto:hello@kepterwear.kz"
              className="text-bone underline decoration-line underline-offset-4 hover:decoration-bone"
            >
              hello@kepterwear.kz
            </a>{" "}
            ·{" "}
            <a
              href="https://www.instagram.com/kepter_wear/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone underline decoration-line underline-offset-4 hover:decoration-bone"
            >
              Instagram
            </a>
          </p>
          {/* TODO: replace with real requisites before launch (required by Robokassa) */}
          <p className="mt-3 text-xs text-muted">
            [ИП / ТОО «наименование», БИН/ИИН, юридический адрес]
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:justify-self-end">
          {infoPages.map((page) => (
            <Link
              key={page.slug}
              href={`/${locale}/info/${page.slug}`}
              className="text-bone hover:underline"
            >
              {page.title[locale]}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
