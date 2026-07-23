import Image from "next/image";
import Link from "next/link";
import type { Locale, Product } from "@/types";
import { formatKZT } from "@/lib/format";
import { withBase } from "@/lib/img";

/**
 * Product tile cloned from HUF's products-grid-item:
 * square #f0f0f0 tile, alt image cross-fades in over .25s ease-in-out on
 * hover, centered 12px/17px text with .05em tracking, optional bold
 * green label above the title, price 5px below.
 */
export function ProductCard({
  product,
  locale,
  label,
}: {
  product: Product;
  locale: Locale;
  label?: string;
}) {
  const [front, back] = product.images;

  return (
    <Link href={`/${locale}/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-ink-2">
        <Image
          src={withBase(front)}
          alt={product.name[locale]}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-opacity duration-[250ms] ease-in-out group-hover:opacity-0"
        />
        {back && (
          <Image
            src={withBase(back)}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-[250ms] ease-in-out group-hover:opacity-100"
          />
        )}
      </div>
      <div className="px-[5px] pb-[6px] pt-[7px] text-center text-[12px] leading-[17px] tracking-[0.05em]">
        {label && (
          <p className="pb-[5px] font-bold text-green">{label}</p>
        )}
        <p>{product.name[locale]}</p>
        <p className="pt-[5px]">{formatKZT(product.price, locale)}</p>
      </div>
    </Link>
  );
}
