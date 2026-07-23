import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { verifySuccessRedirect, extractCallbackParams } from "@/lib/robokassa";
import { getSupabase } from "@/lib/supabase";
import { ClearCart } from "@/components/ClearCart";

export const dynamic = "force-dynamic";

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const sp = await searchParams;
  const flat: Record<string, string> = {};
  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === "string") flat[key] = value;
  }

  const callbackParams = extractCallbackParams(flat);
  const password1 = process.env.ROBOKASSA_PASSWORD1 ?? "";
  const valid =
    callbackParams !== null &&
    password1 !== "" &&
    verifySuccessRedirect(callbackParams, password1);

  if (!valid) {
    return (
      <Shell
        title={dict.payment.invalidTitle}
        body={dict.payment.invalidBody}
        linkHref={`/${locale}`}
        linkLabel={dict.payment.backHome}
      />
    );
  }

  // The redirect signature is valid, but only the ResultURL callback flips
  // the order to paid. Show "processing" until it has.
  let status: string | null = null;
  try {
    const { data } = await getSupabase()
      .from("orders")
      .select("status")
      .eq("id", Number.parseInt(callbackParams.invId, 10))
      .single();
    status = data?.status ?? null;
  } catch {
    status = null;
  }

  const paid = status === "paid";

  return (
    <Shell
      title={paid ? dict.payment.successTitle : dict.payment.processingTitle}
      body={paid ? dict.payment.successBody : dict.payment.processingBody}
      orderLine={`${dict.payment.orderNumber}${callbackParams.invId}`}
      linkHref={`/${locale}`}
      linkLabel={dict.payment.backHome}
    >
      <ClearCart />
    </Shell>
  );
}

function Shell({
  title,
  body,
  orderLine,
  linkHref,
  linkLabel,
  children,
}: {
  title: string;
  body: string;
  orderLine?: string;
  linkHref: string;
  linkLabel: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      {children}
      <h1 className="mt-6 font-display text-3xl font-extrabold uppercase tracking-tight">
        {title}
      </h1>
      {orderLine && <p className="mt-3 text-accent">{orderLine}</p>}
      <p className="mt-4 max-w-[50ch] leading-relaxed text-muted">{body}</p>
      <Link
        href={linkHref}
        className="mt-8 inline-block btn"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
