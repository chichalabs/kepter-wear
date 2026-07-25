import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { withBase } from "@/lib/img";

/** Campaign photos only, no copy: a HUF-style lookbook. */
const shots: { src: string; ratio: string }[] = [
  { src: "/lookbook/skate.jpg", ratio: "aspect-square" },
  { src: "/lookbook/baursaq.jpg", ratio: "aspect-[4/5]" },
  { src: "/lookbook/smogland.jpg", ratio: "aspect-[4/5]" },
  { src: "/lookbook/many-skate.jpg", ratio: "aspect-square" },
  { src: "/lookbook/pezz.jpg", ratio: "aspect-[4/5]" },
  { src: "/lookbook/grilzz.jpg", ratio: "aspect-square" },
  { src: "/lookbook/truk.jpg", ratio: "aspect-[4/5]" },
  { src: "/lookbook/beak.jpg", ratio: "aspect-[1344/1600]" },
  { src: "/lookbook/upgrade.jpg", ratio: "aspect-[4/5]" },
  { src: "/lookbook/liberty.jpg", ratio: "aspect-square" },
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
      <h1 className="text-[13px] font-bold uppercase leading-[18px] tracking-[0.1em]">
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
              src={withBase(shot.src)}
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
