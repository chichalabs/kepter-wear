import type { Product } from "@/types";

/**
 * Static catalog. Single source of truth for prices: the server recomputes
 * order totals from this file and never trusts client-side amounts.
 *
 * Placeholder catalog of streetwear basics until the real Kepter drop is
 * loaded. To swap in real products: replace `images` paths (drop files into
 * /public/products) and edit names/prices here. Nothing else needs changing.
 */
export const products: Product[] = [
  {
    id: "classic-tee",
    slug: "classic-tee",
    name: {
      ru: "Классическая футболка",
      kk: "Классикалық футболка",
      en: "Classic Tee",
    },
    description: {
      ru: "Плотный хлопок 240 г/м², прямой крой, печать на груди. База, с которой начался Kepter.",
      kk: "240 г/м² тығыз мақта, тік пішім, кеудеде басылым. Kepter басталған база.",
      en: "240 gsm heavyweight cotton, straight fit, chest print. The base Kepter started with.",
    },
    price: 9900,
    images: ["/products/kepter-classic-front.svg", "/products/kepter-classic-back.svg"],
  },
  {
    id: "oversized-tee",
    slug: "oversized-tee",
    name: {
      ru: "Оверсайз футболка",
      kk: "Оверсайз футболка",
      en: "Oversized Tee",
    },
    description: {
      ru: "Свободный силуэт, спущенное плечо, крупная печать на спине.",
      kk: "Еркін силуэт, түсіңкі иық, арқада ірі басылым.",
      en: "Relaxed silhouette, dropped shoulder, large back print.",
    },
    price: 11900,
    images: ["/products/qoshqar-front.svg", "/products/qoshqar-back.svg"],
  },
  {
    id: "heavyweight-tee",
    slug: "heavyweight-tee",
    name: {
      ru: "Футболка Heavyweight",
      kk: "Heavyweight футболкасы",
      en: "Heavyweight Tee",
    },
    description: {
      ru: "Хлопок 300 г/м², плотная резинка ворота, печать в две краски.",
      kk: "300 г/м² мақта, тығыз жаға резеңкесі, екі бояулы басылым.",
      en: "300 gsm cotton, sturdy ribbed collar, two-color print.",
    },
    price: 12900,
    images: ["/products/tulpar-front.svg", "/products/tulpar-back.svg"],
  },
  {
    id: "washed-tee",
    slug: "washed-tee",
    name: {
      ru: "Футболка Washed",
      kk: "Washed футболкасы",
      en: "Washed Tee",
    },
    description: {
      ru: "Винтажная стирка, мягкая ткань, эффект ношеной вещи с первого дня.",
      kk: "Винтаждық жуу, жұмсақ мата, алғашқы күннен тоза бастаған зат эффектісі.",
      en: "Vintage wash, soft hand feel, broken-in look from day one.",
    },
    price: 11900,
    images: ["/products/shanyraq-front.svg", "/products/shanyraq-back.svg"],
  },
  {
    id: "longsleeve",
    slug: "longsleeve",
    name: {
      ru: "Лонгслив",
      kk: "Лонгслив",
      en: "Longsleeve",
    },
    description: {
      ru: "Плотный лонгслив с печатью на рукаве и груди.",
      kk: "Жеңі мен кеудесінде басылымы бар тығыз лонгслив.",
      en: "Heavyweight longsleeve with sleeve and chest prints.",
    },
    price: 12900,
    images: ["/products/kok-bori-front.svg", "/products/kok-bori-back.svg"],
  },
  {
    id: "pocket-tee",
    slug: "pocket-tee",
    name: {
      ru: "Футболка с карманом",
      kk: "Қалталы футболка",
      en: "Pocket Tee",
    },
    description: {
      ru: "Нагрудный карман, минимальная вышивка логотипа.",
      kk: "Кеуде қалтасы, логотиптің шағын кестесі.",
      en: "Chest pocket, minimal logo embroidery.",
    },
    price: 10900,
    images: ["/products/aruana-front.svg", "/products/aruana-back.svg"],
  },
  {
    id: "logo-tee",
    slug: "logo-tee",
    name: {
      ru: "Футболка с логотипом",
      kk: "Логотипті футболка",
      en: "Logo Tee",
    },
    description: {
      ru: "Крупный логотип Kepter жирным гротеском на груди.",
      kk: "Кеудеде қалың гротескпен жазылған ірі Kepter логотипі.",
      en: "Large Kepter logo in heavy grotesque type across the chest.",
    },
    price: 10900,
    images: ["/products/koshpendi-front.svg", "/products/koshpendi-back.svg"],
  },
  {
    id: "crewneck",
    slug: "crewneck",
    name: {
      ru: "Свитшот",
      kk: "Свитшот",
      en: "Crewneck",
    },
    description: {
      ru: "Плотный футер с начёсом, посадка оверсайз, печать на груди.",
      kk: "Түкті тығыз футер, оверсайз пішім, кеудеде басылым.",
      en: "Heavy brushed fleece, oversized fit, chest print.",
    },
    price: 16900,
    images: ["/products/dala-front.svg", "/products/dala-back.svg"],
  },
  {
    id: "hoodie",
    slug: "hoodie",
    name: {
      ru: "Худи",
      kk: "Худи",
      en: "Hoodie",
    },
    description: {
      ru: "Тяжёлый футер 400 г/м², двойной капюшон, карман-кенгуру.",
      kk: "400 г/м² ауыр футер, қос қабат капюшон, кенгуру қалта.",
      en: "400 gsm heavy fleece, double-layer hood, kangaroo pocket.",
    },
    price: 19900,
    images: ["/products/qus-joly-front.svg", "/products/qus-joly-back.svg"],
  },
];

export function getProduct(idOrSlug: string): Product | undefined {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}
