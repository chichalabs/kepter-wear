import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n/config";
import { infoPages, getInfoPage } from "@/lib/infoPages";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    infoPages.map((page) => ({ locale, slug: page.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getInfoPage(slug);
  if (!isLocale(locale) || !page) return {};
  return { title: page.title[locale] };
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = getInfoPage(slug);
  if (!isLocale(locale) || !page) notFound();

  return (
    <div className="mx-auto max-w-[760px] px-4 pb-20 pt-10 sm:px-6">
      <h1 className="text-[13px] font-bold uppercase leading-[18px] tracking-[0.1em]">
        {page.title[locale]}
      </h1>
      <div className="mt-6 space-y-8">
        {page.sections.map((section, i) => (
          <section key={i}>
            {section.h && (
              <h2 className="text-[15px] font-bold">{section.h[locale]}</h2>
            )}
            {section.body?.map((paragraph, j) => (
              <p
                key={j}
                className="mt-3 text-[14px] leading-relaxed text-bone"
              >
                {paragraph[locale]}
              </p>
            ))}
            {section.table && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-[14px]">
                  <thead>
                    <tr className="border-b-2 border-bone text-left">
                      {section.table.head.map((cell, j) => (
                        <th key={j} className="py-2 pr-4 font-bold">
                          {cell[locale]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, j) => (
                      <tr key={j} className="border-b border-line">
                        {row.map((cell, k) => (
                          <td key={k} className="py-2 pr-4">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
