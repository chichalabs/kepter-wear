import { createHash } from "node:crypto";

/**
 * Robokassa.kz integration (docs.robokassa.kz).
 *
 * Signatures are MD5 over colon-joined parts:
 *   payment:  MD5(MerchantLogin:OutSum:InvId:Password#1[:Shp_...alphabetical])
 *   result:   MD5(OutSum:InvId:Password#2[:Shp_...alphabetical])
 *   success:  MD5(OutSum:InvId:Password#1[:Shp_...alphabetical])
 */

export const ROBOKASSA_PAYMENT_URL = "https://auth.robokassa.kz/Merchant/Index.aspx";

function md5(input: string): string {
  return createHash("md5").update(input, "utf8").digest("hex").toUpperCase();
}

function shpParts(shp: Record<string, string>): string[] {
  return Object.keys(shp)
    .sort()
    .map((key) => `${key}=${shp[key]}`);
}

export interface PaymentParams {
  merchantLogin: string;
  password1: string;
  /** Decimal string, e.g. "9900.00" */
  outSum: string;
  invId: number;
  description: string;
  email?: string;
  culture?: "ru" | "en";
  isTest?: boolean;
  shp?: Record<string, string>;
}

export function buildPaymentUrl(params: PaymentParams): string {
  const shp = params.shp ?? {};
  const signature = md5(
    [
      params.merchantLogin,
      params.outSum,
      String(params.invId),
      params.password1,
      ...shpParts(shp),
    ].join(":"),
  );

  const query = new URLSearchParams({
    MerchantLogin: params.merchantLogin,
    OutSum: params.outSum,
    InvId: String(params.invId),
    Description: params.description,
    SignatureValue: signature,
    Culture: params.culture ?? "ru",
  });
  if (params.email) query.set("Email", params.email);
  if (params.isTest) query.set("IsTest", "1");
  for (const [key, value] of Object.entries(shp)) query.set(key, value);

  return `${ROBOKASSA_PAYMENT_URL}?${query.toString()}`;
}

export interface CallbackParams {
  outSum: string;
  invId: string;
  signatureValue: string;
  shp?: Record<string, string>;
}

/** Verify the ResultURL server-to-server callback (Password#2). */
export function verifyResultCallback(params: CallbackParams, password2: string): boolean {
  return verify(params, password2);
}

/** Verify the SuccessURL browser redirect (Password#1). */
export function verifySuccessRedirect(params: CallbackParams, password1: string): boolean {
  return verify(params, password1);
}

function verify(params: CallbackParams, password: string): boolean {
  const shp = params.shp ?? {};
  const expected = md5(
    [params.outSum, params.invId, password, ...shpParts(shp)].join(":"),
  );
  return expected === params.signatureValue.toUpperCase();
}

/** Pull OutSum/InvId/SignatureValue/Shp_* out of a query or form params object. */
export function extractCallbackParams(
  source: Record<string, string>,
): CallbackParams | null {
  const outSum = source["OutSum"];
  const invId = source["InvId"];
  const signatureValue = source["SignatureValue"];
  if (!outSum || !invId || !signatureValue) return null;
  const shp: Record<string, string> = {};
  for (const [key, value] of Object.entries(source)) {
    if (key.toLowerCase().startsWith("shp_")) shp[key] = value;
  }
  return { outSum, invId, signatureValue, shp };
}
