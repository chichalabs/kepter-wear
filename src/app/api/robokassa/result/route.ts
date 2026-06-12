import { getSupabase } from "@/lib/supabase";
import { verifyResultCallback, extractCallbackParams } from "@/lib/robokassa";

/**
 * Robokassa ResultURL callback. This is the authoritative payment
 * confirmation. Robokassa retries up to 5 times until it receives the
 * literal body "OK{InvId}".
 */

async function paramsFromRequest(request: Request): Promise<Record<string, string>> {
  const url = new URL(request.url);
  const merged: Record<string, string> = Object.fromEntries(url.searchParams);
  if (request.method === "POST") {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = new URLSearchParams(await request.text());
      for (const [key, value] of form) merged[key] = value;
    }
  }
  return merged;
}

async function handle(request: Request): Promise<Response> {
  const password2 = process.env.ROBOKASSA_PASSWORD2;
  if (!password2) return new Response("not configured", { status: 503 });

  const source = await paramsFromRequest(request);
  const params = extractCallbackParams(source);
  if (!params) return new Response("missing params", { status: 400 });

  if (!verifyResultCallback(params, password2)) {
    console.warn("robokassa result: bad signature", { invId: params.invId });
    return new Response("bad signature", { status: 400 });
  }

  const invId = Number.parseInt(params.invId, 10);
  if (!Number.isInteger(invId) || invId < 1) {
    return new Response("bad InvId", { status: 400 });
  }

  const supabase = getSupabase();
  const { data: order, error } = await supabase
    .from("orders")
    .select("id, status, amount")
    .eq("id", invId)
    .single();

  if (error || !order) {
    console.warn("robokassa result: unknown order", { invId });
    return new Response("unknown order", { status: 404 });
  }

  // Amount must match what we charged for, to the kopek.
  if (Number(params.outSum).toFixed(2) !== Number(order.amount).toFixed(2)) {
    console.error("robokassa result: amount mismatch", {
      invId,
      expected: order.amount,
      received: params.outSum,
    });
    return new Response("amount mismatch", { status: 400 });
  }

  // Idempotent: repeated callbacks for an already-paid order re-answer OK.
  if (order.status !== "paid") {
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("id", invId);
    if (updateError) {
      console.error("robokassa result: update failed", updateError);
      return new Response("update failed", { status: 500 });
    }
  }

  return new Response(`OK${params.invId}`, {
    headers: { "content-type": "text/plain" },
  });
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}
