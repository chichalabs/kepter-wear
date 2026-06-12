import type { Locale } from "@/types";

const intlLocale: Record<Locale, string> = {
  ru: "ru-KZ",
  kk: "kk-KZ",
  en: "en-US",
};

export function formatKZT(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: "currency",
    currency: "KZT",
    maximumFractionDigits: 0,
  }).format(amount);
}
