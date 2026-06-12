import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import {
  buildPaymentUrl,
  verifyResultCallback,
  verifySuccessRedirect,
  extractCallbackParams,
} from "./robokassa";

const md5 = (s: string) =>
  createHash("md5").update(s, "utf8").digest("hex").toUpperCase();

describe("buildPaymentUrl", () => {
  it("signs MerchantLogin:OutSum:InvId:Password1", () => {
    const url = new URL(
      buildPaymentUrl({
        merchantLogin: "kepter",
        password1: "pw1",
        outSum: "9900.00",
        invId: 42,
        description: "Order 42",
      }),
    );
    expect(url.origin + url.pathname).toBe(
      "https://auth.robokassa.kz/Merchant/Index.aspx",
    );
    expect(url.searchParams.get("MerchantLogin")).toBe("kepter");
    expect(url.searchParams.get("OutSum")).toBe("9900.00");
    expect(url.searchParams.get("InvId")).toBe("42");
    expect(url.searchParams.get("SignatureValue")).toBe(
      md5("kepter:9900.00:42:pw1"),
    );
    expect(url.searchParams.get("IsTest")).toBeNull();
  });

  it("includes Shp_ params alphabetically in the signature and the query", () => {
    const url = new URL(
      buildPaymentUrl({
        merchantLogin: "kepter",
        password1: "pw1",
        outSum: "100.00",
        invId: 1,
        description: "d",
        isTest: true,
        shp: { Shp_locale: "ru", Shp_a: "x" },
      }),
    );
    expect(url.searchParams.get("SignatureValue")).toBe(
      md5("kepter:100.00:1:pw1:Shp_a=x:Shp_locale=ru"),
    );
    expect(url.searchParams.get("Shp_a")).toBe("x");
    expect(url.searchParams.get("Shp_locale")).toBe("ru");
    expect(url.searchParams.get("IsTest")).toBe("1");
  });
});

describe("verifyResultCallback", () => {
  it("accepts a valid Password2 signature, case-insensitively", () => {
    const sig = md5("9900.00:42:pw2");
    expect(
      verifyResultCallback(
        { outSum: "9900.00", invId: "42", signatureValue: sig.toLowerCase() },
        "pw2",
      ),
    ).toBe(true);
  });

  it("rejects a wrong signature", () => {
    expect(
      verifyResultCallback(
        { outSum: "9900.00", invId: "42", signatureValue: md5("bad") },
        "pw2",
      ),
    ).toBe(false);
  });

  it("rejects a tampered amount", () => {
    const sig = md5("9900.00:42:pw2");
    expect(
      verifyResultCallback(
        { outSum: "1.00", invId: "42", signatureValue: sig },
        "pw2",
      ),
    ).toBe(false);
  });

  it("includes Shp_ params alphabetically", () => {
    const sig = md5("100.00:1:pw2:Shp_a=x:Shp_b=y");
    expect(
      verifyResultCallback(
        {
          outSum: "100.00",
          invId: "1",
          signatureValue: sig,
          shp: { Shp_b: "y", Shp_a: "x" },
        },
        "pw2",
      ),
    ).toBe(true);
  });
});

describe("verifySuccessRedirect", () => {
  it("verifies with Password1", () => {
    const sig = md5("9900.00:42:pw1");
    expect(
      verifySuccessRedirect(
        { outSum: "9900.00", invId: "42", signatureValue: sig },
        "pw1",
      ),
    ).toBe(true);
    expect(
      verifySuccessRedirect(
        { outSum: "9900.00", invId: "42", signatureValue: sig },
        "pw2",
      ),
    ).toBe(false);
  });
});

describe("extractCallbackParams", () => {
  it("extracts core params and Shp_ params", () => {
    const params = extractCallbackParams({
      OutSum: "100.00",
      InvId: "7",
      SignatureValue: "ABC",
      Shp_locale: "kk",
      Culture: "ru",
    });
    expect(params).toEqual({
      outSum: "100.00",
      invId: "7",
      signatureValue: "ABC",
      shp: { Shp_locale: "kk" },
    });
  });

  it("returns null when required params are missing", () => {
    expect(extractCallbackParams({ OutSum: "1" })).toBeNull();
  });
});
