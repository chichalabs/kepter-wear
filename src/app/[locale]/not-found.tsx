import Link from "next/link";

// Locale isn't available in not-found; show all three languages briefly.
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <h1 className="mt-6 font-display text-3xl font-extrabold uppercase tracking-tight">
        404
      </h1>
      <p className="mt-4 leading-relaxed text-muted">
        Такой страницы нет. / Мұндай бет жоқ. / This page does not exist.
      </p>
      <Link
        href="/ru"
        className="mt-8 inline-block btn"
      >
        Kepter Wear
      </Link>
    </div>
  );
}
