import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function PaymentFailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  // FailURL carries no signature; only mark a still-pending order as failed.
  const sp = await searchParams;
  const invId = Number.parseInt(typeof sp.InvId === "string" ? sp.InvId : "", 10);
  if (Number.isInteger(invId) && invId > 0) {
    try {
      await getSupabase()
        .from("orders")
        .update({ status: "failed" })
        .eq("id", invId)
        .eq("status", "pending");
    } catch {
      // best-effort: the order stays pending and can still be paid later
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <h1 className="mt-6 font-display text-3xl font-extrabold uppercase tracking-tight">
        {dict.payment.failTitle}
      </h1>
      <p className="mt-4 max-w-[50ch] leading-relaxed text-muted">
        {dict.payment.failBody}
      </p>
      <Link
        href={`/${locale}/cart`}
        className="mt-8 inline-block btn"
      >
        {dict.payment.backToCart}
      </Link>
    </div>
  );
}
