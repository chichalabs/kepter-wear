import type { Product } from "@/types";

/**
 * Static catalog. Single source of truth for prices: the server recomputes
 * order totals from this file and never trusts client-side amounts.
 *
 * Photos live in /public/products as <slug>-front/back/detail.jpg.
 * images[0] is the tile shot, images[1] is the hover swap.
 */
export const products: Product[] = [
  {
    id: "kese",
    slug: "kese",
    name: { ru: "Kese", kk: "Kese", en: "Kese" },
    description: {
      ru: "Чёрная оверсайз футболка с принтом: баурсак-баскетбол над кесе с кимызом.",
      kk: "Қара оверсайз футболка: қымызды кесенің үстіндегі баурсак-баскетбол доп принті.",
      en: "Black oversized tee: a bauyrsaq basketball dropping into an ornamented kese bowl.",
    },
    price: 14900,
    images: [
      "/products/kese-front.jpg",
      "/products/kese-back.jpg",
      "/products/kese-detail.jpg",
    ],
  },
  {
    id: "upgrade",
    slug: "upgrade",
    name: { ru: "Upgrade", kk: "Upgrade", en: "Upgrade" },
    description: {
      ru: "Белая оверсайз футболка с коллажем Upgrade: MPC, геймпад, орнаменты и груша.",
      kk: "Ақ оверсайз футболка, Upgrade коллажы: MPC, геймпад, өрнектер мен боксшы қап.",
      en: "White oversized tee with the Upgrade collage: MPC, gamepad, ornaments, punching bag.",
    },
    price: 14900,
    images: ["/products/upgrade-front.jpg", "/products/upgrade-detail.jpg"],
  },
  {
    id: "instructions",
    slug: "instructions",
    name: { ru: "Instructions", kk: "Instructions", en: "Instructions" },
    description: {
      ru: "Чёрная оверсайз футболка с принтом-инструкцией в три шага.",
      kk: "Қара оверсайз футболка, үш қадамдық нұсқаулық принті.",
      en: "Black oversized tee with a three-step instructions print.",
    },
    price: 14900,
    images: [
      "/products/instructions-front.jpg",
      "/products/instructions-detail.jpg",
    ],
  },
  {
    id: "bauyrsaq",
    slug: "bauyrsaq",
    name: { ru: "Bauyrsaq", kk: "Bauyrsaq", en: "Bauyrsaq" },
    description: {
      ru: "Белая оверсайз футболка с двойным тегом Bauyrsaq на груди.",
      kk: "Кеудесінде қос Bauyrsaq тегі бар ақ оверсайз футболка.",
      en: "White oversized tee with a double Bauyrsaq tag across the chest.",
    },
    price: 14900,
    images: [
      "/products/bauyrsaq-front.jpg",
      "/products/bauyrsaq-back.jpg",
      "/products/bauyrsaq-detail.jpg",
    ],
  },
  {
    id: "apa",
    slug: "apa",
    name: { ru: "Apa", kk: "Apa", en: "Apa" },
    description: {
      ru: "Белая оверсайз футболка с малым тегом Kepter на груди и принтом Apa на спине.",
      kk: "Кеудесінде шағын Kepter тегі, арқасында Apa принті бар ақ оверсайз футболка.",
      en: "White oversized tee with a small Kepter chest tag and the Apa back print.",
    },
    price: 14900,
    images: [
      "/products/apa-front.jpg",
      "/products/apa-back.jpg",
      "/products/apa-detail.jpg",
    ],
  },
  {
    id: "chocolate",
    slug: "chocolate",
    name: { ru: "Chocolate", kk: "Chocolate", en: "Chocolate" },
    description: {
      ru: "Светлая оверсайз футболка с долькой шоколада Kepter на груди.",
      kk: "Кеудесінде Kepter шоколад тілімі бар ақшыл оверсайз футболка.",
      en: "Off-white oversized tee with a Kepter chocolate square on the chest.",
    },
    price: 14900,
    images: [
      "/products/chocolate-front.jpg",
      "/products/chocolate-back.jpg",
      "/products/chocolate-detail.jpg",
    ],
  },
  {
    id: "liberty",
    slug: "liberty",
    name: { ru: "Liberty", kk: "Liberty", en: "Liberty" },
    description: {
      ru: "Чёрная оверсайз футболка с белым тегом Kepter и принтом Liberty на спине.",
      kk: "Ақ Kepter тегі мен арқасында Liberty принті бар қара оверсайз футболка.",
      en: "Black oversized tee with a white Kepter tag and the Liberty back print.",
    },
    price: 14900,
    images: [
      "/products/liberty-front.jpg",
      "/products/liberty-back.jpg",
      "/products/liberty-detail.jpg",
    ],
  },
  {
    id: "pez",
    slug: "pez",
    name: { ru: "Pez", kk: "Pez", en: "Pez" },
    description: {
      ru: "Чёрная оверсайз футболка с баурсаком-конфетой Pez на груди.",
      kk: "Кеудесінде Pez кәмпит-баурсағы бар қара оверсайз футболка.",
      en: "Black oversized tee with a Pez candy bauyrsaq on the chest.",
    },
    price: 14900,
    images: [
      "/products/pez-front.jpg",
      "/products/pez-back.jpg",
      "/products/pez-detail.jpg",
      "/products/pez-detail-back.jpg",
    ],
  },
];

export function getProduct(idOrSlug: string): Product | undefined {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}
