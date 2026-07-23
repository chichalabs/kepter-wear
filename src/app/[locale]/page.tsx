import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { HeroVideo } from "@/components/HeroVideo";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const featured = products.slice(0, 4);
  const rest = products.slice(4);

  return (
    <div className="pb-16">
      <HeroVideo />

      {/* Collection row: heading left, "see all" right, 4-up tiles.
          Mobile: horizontal snap carousel, HUF style. */}
      <section className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[13px] font-bold uppercase leading-[18px] tracking-[0.1em]">
            {dict.home.collection}
          </h2>
          <Link
            href={`/${locale}/#catalog`}
            className="flex items-center gap-1.5 text-[12px] tracking-[0.05em] hover:underline"
          >
            {dict.home.seeAll}
            <ArrowRight size={13} weight="bold" />
          </Link>
        </div>
        <div className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {featured.map((product) => (
            <div
              key={product.id}
              className="w-[76%] shrink-0 snap-start sm:w-auto"
            >
              <ProductCard
                product={product}
                locale={locale}
                label={dict.home.collection}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Full catalog */}
      <section
        id="catalog"
        className="mx-auto max-w-[1400px] scroll-mt-20 px-4 pt-12 sm:px-6"
      >
        <h2 className="text-[13px] font-bold uppercase leading-[18px] tracking-[0.1em]">
          {dict.catalog.title}
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {rest.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
