import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { getSupabase } from "@/lib/supabase";
import { buildPaymentUrl } from "@/lib/robokassa";
import { isLocale } from "@/lib/i18n/config";
import { SIZES } from "@/types";
import type { OrderItemSnapshot } from "@/types";

const MAX_QTY = 10;

interface OrderRequest {
  items: { productId: string; size: string; qty: number }[];
  customer: {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    comment?: string;
  };
  locale: string;
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request) {
  let body: OrderRequest;
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }

  const { items, customer, locale: rawLocale } = body ?? {};
  const locale = typeof rawLocale === "string" && isLocale(rawLocale) ? rawLocale : "ru";

  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return badRequest("invalid items");
  }
  if (typeof customer !== "object" || customer === null) {
    return badRequest("invalid customer");
  }
  for (const field of ["name", "phone", "email", "city", "address"] as const) {
    const value = customer[field];
    if (typeof value !== "string" || value.trim().length === 0 || value.length > 500) {
      return badRequest(`invalid customer.${field}`);
    }
  }
  // Optional free-text delivery instructions.
  if (customer.comment !== undefined && typeof customer.comment !== "string") {
    return badRequest("invalid customer.comment");
  }
  const comment = (customer.comment ?? "").trim().slice(0, 1000);

  // Recompute the amount from the catalog. Client prices are never trusted.
  const snapshots: OrderItemSnapshot[] = [];
  let amount = 0;
  for (const item of items) {
    const product = getProduct(item?.productId);
    if (!product) return badRequest("unknown product");
    if (!(SIZES as readonly string[]).includes(item.size)) return badRequest("invalid size");
    if (!Number.isInteger(item.qty) || item.qty < 1 || item.qty > MAX_QTY) {
      return badRequest("invalid qty");
    }
    snapshots.push({
      productId: product.id,
      name: product.name.ru,
      size: item.size as OrderItemSnapshot["size"],
      qty: item.qty,
      unitPrice: product.price,
    });
    amount += product.price * item.qty;
  }

  const merchantLogin = process.env.ROBOKASSA_MERCHANT_LOGIN;
  const password1 = process.env.ROBOKASSA_PASSWORD1;
  if (!merchantLogin || !password1) {
    return NextResponse.json({ error: "payments not configured" }, { status: 503 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("orders")
    .insert({
      status: "pending",
      amount,
      currency: "KZT",
      customer_name: customer.name.trim(),
      phone: customer.phone.trim(),
      email: customer.email.trim(),
      city: customer.city.trim(),
      address: customer.address.trim(),
      comment: comment || null,
      items: snapshots,
      locale,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("order insert failed", error);
    return NextResponse.json({ error: "could not create order" }, { status: 500 });
  }

  const paymentUrl = buildPaymentUrl({
    merchantLogin,
    password1,
    outSum: amount.toFixed(2),
    invId: data.id,
    description: `Kepter Wear order ${data.id}`,
    email: customer.email.trim(),
    culture: locale === "en" ? "en" : "ru",
    isTest: process.env.ROBOKASSA_IS_TEST === "1",
  });

  return NextResponse.json({ orderId: data.id, paymentUrl });
}
