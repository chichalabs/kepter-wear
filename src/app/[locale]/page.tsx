import { notFound } from "next/navigation";
import {
  BagSimple,
  CreditCard,
  Truck,
} from "@phosphor-icons/react/dist/ssr";
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

  return (
    <div className="pb-16">
      <HeroVideo />

      {/* Schematic 3-step order strip */}
      <section
        aria-label={dict.home.info.title}
        className="mx-auto max-w-[1400px] px-4 pt-4 sm:px-6"
      >
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {(
            [
              [BagSimple, dict.home.info.step1],
              [CreditCard, dict.home.info.step2],
              [Truck, dict.home.info.step3],
            ] as const
          ).map(([Icon, text]) => (
            <div
              key={text}
              className="flex items-center gap-3 bg-ink px-4 py-3"
            >
              <Icon size={20} weight="regular" className="shrink-0" />
              <p className="text-[12px] font-bold uppercase tracking-[0.025em]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="catalog"
        className="mx-auto max-w-[1400px] scroll-mt-20 px-4 pt-10 sm:px-6"
      >
        <h2 className="text-[13px] font-bold uppercase leading-[18px] tracking-[0.1em]">
          {dict.catalog.title}
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
