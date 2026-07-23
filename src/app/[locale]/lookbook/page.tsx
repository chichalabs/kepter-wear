import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Campaign photos only, no copy, no product links: a HUF-style lookbook.
 * Replace with real shots: drop files into /public/lookbook and swap the
 * URLs below for "/lookbook/<file>.jpg" (wrapped in withBase). Until then,
 * placeholder photography holds the layout.
 */
const shots: { src: string; ratio: string }[] = [
  { src: "https://picsum.photos/seed/kepter-look-01/900/1200", ratio: "aspect-[3/4]" },
  { src: "https://picsum.photos/seed/kepter-look-02/900/600", ratio: "aspect-[3/2]" },
  { src: "https://picsum.photos/seed/kepter-look-03/900/1100", ratio: "aspect-[9/11]" },
  { src: "https://picsum.photos/seed/kepter-look-04/900/900", ratio: "aspect-square" },
  { src: "https://picsum.photos/seed/kepter-look-05/900/1200", ratio: "aspect-[3/4]" },
  { src: "https://picsum.photos/seed/kepter-look-06/900/700", ratio: "aspect-[9/7]" },
  { src: "https://picsum.photos/seed/kepter-look-07/900/1100", ratio: "aspect-[9/11]" },
  { src: "https://picsum.photos/seed/kepter-look-08/900/600", ratio: "aspect-[3/2]" },
  { src: "https://picsum.photos/seed/kepter-look-09/900/1200", ratio: "aspect-[3/4]" },
  { src: "https://picsum.photos/seed/kepter-look-10/900/900", ratio: "aspect-square" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).lookbook.title };
}

export default async function LookbookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-10 sm:px-6">
      <h1 className="font-display text-sm font-semibold uppercase tracking-[0.14em]">
        {dict.lookbook.title}
      </h1>
      <p className="mt-1 text-[13px] text-muted">{dict.lookbook.subtitle}</p>
      <div className="mt-6 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
        {shots.map((shot) => (
          <div
            key={shot.src}
            className={`${shot.ratio} w-full overflow-hidden bg-ink-2`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot.src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
