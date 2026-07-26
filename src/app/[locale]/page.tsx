import { notFound } from "next/navigation";
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
