import Image from "next/image";
import { notFound } from "next/navigation";
import { withBase } from "@/lib/img";
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

      {/* Buyer info: the three-step order flow */}
      <section className="mx-auto max-w-[1400px] px-4 pt-14 sm:px-6">
        <h2 className="text-[13px] font-bold uppercase leading-[18px] tracking-[0.1em]">
          {dict.home.info.title}
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {(
            [
              ["/info/cart.jpg", dict.home.info.step1],
              ["/info/payment.jpg", dict.home.info.step2],
              ["/info/delivery.jpg", dict.home.info.step3],
            ] as const
          ).map(([src, text]) => (
            <div key={src} className="bg-ink-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={withBase(src)}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="max-w-[30ch] px-6 pb-6 pt-5 text-[16px] font-bold leading-snug">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
