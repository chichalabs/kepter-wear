import Image from "next/image";
import Link from "next/link";
import type { Locale, Product } from "@/types";
import { formatKZT } from "@/lib/format";
import { withBase } from "@/lib/img";

export function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/product/${product.slug}`}
      className="group block border border-line bg-ink-2 transition-colors hover:border-accent"
    >
      <div className="relative aspect-[6/7] overflow-hidden">
        <Image
          src={withBase(product.images[0])}
          alt={product.name[locale]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-baseline justify-between gap-2 px-4 py-3">
        <span className="font-display text-sm font-semibold uppercase tracking-wide">
          {product.name[locale]}
        </span>
        <span className="shrink-0 text-sm text-muted">
          {formatKZT(product.price, locale)}
        </span>
      </div>
    </Link>
  );
}
