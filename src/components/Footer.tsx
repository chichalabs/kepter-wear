import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n/types";

export function Footer({ dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-10 sm:px-6">
        <p className="text-sm text-muted">{dict.footer.tagline}</p>
        <p className="text-sm text-muted">
          {dict.footer.contacts}:{" "}
          <a
            href="mailto:hello@kepterwear.kz"
            className="text-bone underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            hello@kepterwear.kz
          </a>
        </p>
      </div>
    </footer>
  );
}
