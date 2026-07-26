"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { formatKZT } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types";

type Field = "name" | "phone" | "email" | "city" | "address";

const initialForm: Record<Field, string> = {
  name: "",
  phone: "",
  email: "",
  city: "",
  address: "",
};

/** Masks digits into +7-777-777-7777 as the user types. */
function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const rest = d.slice(1);
  let out = "+7";
  if (rest.length > 0) out += "-" + rest.slice(0, 3);
  if (rest.length > 3) out += "-" + rest.slice(3, 6);
  if (rest.length > 6) out += "-" + rest.slice(6, 10);
  return out;
}

export function CheckoutForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { items, hydrated, total } = useCart();
  const [form, setForm] = useState(initialForm);
  const [delivery, setDelivery] = useState<"courier" | "kazpost">("courier");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);

  if (!hydrated) {
    return <div className="h-64 animate-pulse border border-line bg-ink-2" aria-hidden />;
  }

  if (items.length === 0) {
    return (
      <div className="border border-line bg-ink-2 px-6 py-14 text-center">
        <p className="font-display text-lg font-semibold uppercase tracking-wide">
          {dict.cart.empty}
        </p>
        <Link
          href={`/${locale}#catalog`}
          className="mt-6 inline-block btn"
        >
          {dict.cart.goToCatalog}
        </Link>
      </div>
    );
  }

  function validate(): boolean {
    const next: Partial<Record<Field, string>> = {};
    for (const field of Object.keys(form) as Field[]) {
      if (!form[field].trim()) next[field] = dict.checkout.errors.required;
    }
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      next.email = dict.checkout.errors.email;
    }
    if (form.phone.trim() && !/^\+7-\d{3}-\d{3}-\d{4}$/.test(form.phone.trim())) {
      next.phone = dict.checkout.errors.phone;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(false);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          items,
          customer: { ...form, comment: comment.trim() },
          delivery,
          locale,
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const { paymentUrl } = await res.json();
      if (typeof paymentUrl !== "string") throw new Error("no payment url");
      // Cart is cleared on the success page, after the payment goes through.
      window.location.assign(paymentUrl);
    } catch (err) {
      console.error("checkout failed", err);
      setServerError(true);
      setSubmitting(false);
    }
  }

  const fields: { key: Field; label: string; type: string; hint?: string; autoComplete: string }[] = [
    { key: "name", label: dict.checkout.name, type: "text", autoComplete: "name" },
    { key: "phone", label: dict.checkout.phone, type: "tel", autoComplete: "tel" },
    { key: "email", label: dict.checkout.email, type: "email", autoComplete: "email" },
    { key: "city", label: dict.checkout.city, type: "text", autoComplete: "address-level2" },
    {
      key: "address",
      label: dict.checkout.address,
      type: "text",
      hint: dict.checkout.addressHint,
      autoComplete: "street-address",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr]">
      <form onSubmit={handleSubmit} noValidate>
        <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
          {dict.checkout.contactInfo}
        </h2>
        <div
          className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
          role="radiogroup"
          aria-label={dict.checkout.deliveryMethod}
        >
          {(
            [
              [
                "courier",
                dict.checkout.deliveryCourier,
                dict.checkout.deliveryCourierHint,
              ],
              [
                "kazpost",
                dict.checkout.deliveryKazpost,
                dict.checkout.deliveryKazpostHint,
              ],
            ] as const
          ).map(([value, label, hint]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={delivery === value}
              onClick={() => setDelivery(value)}
              className={`border-2 px-4 py-3.5 text-left transition-colors ${
                delivery === value
                  ? "border-bone"
                  : "border-line hover:border-muted"
              }`}
            >
              <span className="block text-sm font-bold">{label}</span>
              <span className="mt-1 block text-xs text-muted">{hint}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-5">
          {fields.map(({ key, label, type, hint, autoComplete }) => (
            <div key={key} className="flex flex-col gap-2">
              <label htmlFor={`field-${key}`} className="text-sm text-bone">
                {label}
              </label>
              <input
                id={`field-${key}`}
                type={type}
                autoComplete={autoComplete}
                placeholder={key === "phone" ? "+7-777-777-7777" : undefined}
                value={form[key]}
                onChange={(e) => {
                  const value =
                    key === "phone" ? formatPhone(e.target.value) : e.target.value;
                  setForm((f) => ({ ...f, [key]: value }));
                }}
                onBlur={
                  key === "phone"
                    ? () => setForm((f) => ({ ...f, phone: formatPhone(f.phone) }))
                    : undefined
                }
                aria-invalid={errors[key] ? true : undefined}
                aria-describedby={errors[key] ? `error-${key}` : hint ? `hint-${key}` : undefined}
                className={`rounded-[2px] border bg-ink-2 px-3.5 py-2.5 text-bone outline-none transition-colors placeholder:text-muted focus:border-accent ${
                  errors[key] ? "border-danger" : "border-line"
                }`}
              />
              {hint && !errors[key] && (
                <p id={`hint-${key}`} className="text-xs text-muted">
                  {hint}
                </p>
              )}
              {errors[key] && (
                <p id={`error-${key}`} className="text-xs text-danger">
                  {errors[key]}
                </p>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label htmlFor="field-comment" className="text-sm text-bone">
              {dict.checkout.comment}{" "}
              <span className="text-muted">({dict.checkout.optional})</span>
            </label>
            <textarea
              id="field-comment"
              rows={3}
              maxLength={1000}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-y rounded-[2px] border border-line bg-ink-2 px-3.5 py-2.5 text-bone outline-none transition-colors placeholder:text-muted focus:border-accent"
            />
          </div>
        </div>
        {serverError && (
          <p className="mt-5 border border-danger px-4 py-3 text-sm text-danger">
            {dict.checkout.errors.generic}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="mt-7 w-full btn active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? dict.checkout.paying : dict.checkout.pay}
        </button>
        <p className="mt-4 max-w-[55ch] text-xs leading-relaxed text-muted">
          {dict.checkout.payNote}
        </p>
      </form>

      <aside className="h-fit border border-line bg-ink-2 p-5">
        <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
          {dict.checkout.orderSummary}
        </h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return (
              <li
                key={`${item.productId}-${item.size}`}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="min-w-0">
                  {product.name[locale]}{" "}
                  <span className="text-muted">
                    {item.size} × {item.qty}
                  </span>
                </span>
                <span className="shrink-0">
                  {formatKZT(product.price * item.qty, locale)}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
          <span className="text-sm text-muted">{dict.checkout.total}</span>
          <span className="font-display text-lg font-bold text-accent">
            {formatKZT(total, locale)}
          </span>
        </div>
      </aside>
    </div>
  );
}
