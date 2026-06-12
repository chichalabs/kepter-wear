import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CheckoutForm } from "@/components/CheckoutForm";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight">
        {dict.checkout.title}
      </h1>
      <div className="mt-8">
        <CheckoutForm locale={locale} dict={dict} />
      </div>
    </div>
  );
}
