import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { OrnamentCurl } from "@/components/Ornament";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const featured = products[0];

  return (
    <div>
      {/* Asymmetric split hero: copy left, featured tee right */}
      <section className="relative overflow-hidden border-b border-line">
        <OrnamentCurl className="pointer-events-none absolute -right-20 -top-24 h-[480px] w-[480px] text-bone opacity-[0.04]" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[7fr_5fr] lg:pb-20 lg:pt-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
              {dict.hero.eyebrow}
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>
            <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-muted">
              {dict.hero.subtitle}
            </p>
            <Link
              href="#catalog"
              className="mt-8 inline-block rounded-[2px] bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent-press active:translate-y-px"
            >
              {dict.hero.cta}
            </Link>
          </div>
          <div className="relative mx-auto aspect-[6/7] w-full max-w-105 lg:max-w-none">
            <Image
              src={featured.images[0]}
              alt={featured.name[locale]}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="border border-line object-cover"
            />
          </div>
        </div>
      </section>

      {/* Catalog grid */}
      <section id="catalog" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">
          {dict.catalog.title}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
