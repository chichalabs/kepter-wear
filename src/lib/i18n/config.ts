import type { Locale } from "@/types";

export const locales: Locale[] = ["ru", "kk", "en"];
export const defaultLocale: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}
