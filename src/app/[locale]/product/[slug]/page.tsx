import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { products, getProduct } from "@/lib/products";
import { formatKZT } from "@/lib/format";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCart } from "@/components/AddToCart";
import { OrnamentDivider } from "@/components/Ornament";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name[locale],
    description: product.description[locale],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const product = getProduct(slug);
  const dict = getDictionary(locale);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        href={`/${locale}#catalog`}
        className="text-sm text-muted transition-colors hover:text-bone"
      >
        ← {dict.product.backToCatalog}
      </Link>
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery
          images={product.images}
          alt={product.name[locale]}
          labels={[dict.product.front, dict.product.back]}
        />
        <div className="lg:pt-2">
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            {product.name[locale]}
          </h1>
          <p className="mt-3 text-2xl text-accent">
            {formatKZT(product.price, locale)}
          </p>
          <p className="mt-6 max-w-[55ch] leading-relaxed text-bone">
            {product.description[locale]}
          </p>
          <div className="mt-8">
            <AddToCart
              productId={product.id}
              sizeLabel={dict.product.size}
              addLabel={dict.product.addToCart}
              addedLabel={dict.product.added}
            />
          </div>
          <div className="mt-10 border-t border-line pt-6">
            <OrnamentDivider />
            <p className="mt-3 text-sm text-muted">{dict.product.motifLabel}</p>
            <p className="mt-1 max-w-[55ch] text-sm leading-relaxed text-bone">
              {product.motif[locale]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
