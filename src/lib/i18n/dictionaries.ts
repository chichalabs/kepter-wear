import type { Locale } from "@/types";
import type { Dictionary } from "./types";
import { ru } from "./ru";
import { kk } from "./kk";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { ru, kk, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
