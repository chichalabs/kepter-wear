export const SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export type Locale = "ru" | "kk" | "en";

export interface LocalizedText {
  ru: string;
  kk: string;
  en: string;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  /** Price in KZT, whole tenge */
  price: number;
  images: string[];
}

export interface CartItem {
  productId: string;
  size: Size;
  qty: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  comment?: string;
}

export interface OrderItemSnapshot {
  productId: string;
  name: string;
  size: Size;
  qty: number;
  unitPrice: number;
}

export type OrderStatus = "pending" | "paid" | "failed";

export interface Order {
  id: number;
  status: OrderStatus;
  amount: number;
  currency: string;
  customer_name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  comment: string | null;
  items: OrderItemSnapshot[];
  locale: Locale;
  paid_at: string | null;
  created_at: string;
}
