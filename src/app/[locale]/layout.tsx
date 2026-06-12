import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Unbounded, Manrope } from "next/font/google";
import { locales, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

// cyrillic-ext is required for Kazakh glyphs (ә ғ қ ң ө ұ ү һ і)
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-unbounded",
  weight: ["400", "600", "800"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: {
      default: dict.meta.title,
      template: `%s | ${dict.brand}`,
    },
    description: dict.meta.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      languages: {
        ru: "/ru",
        kk: "/kk",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${unbounded.variable} ${manrope.variable}`}>
      <body className="flex min-h-[100dvh] flex-col antialiased">
        <CartProvider>
          <Header locale={locale} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} dict={dict} />
        </CartProvider>
      </body>
    </html>
  );
}
