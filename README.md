# Kepter Wear

Storefront for a Kazakhstani streetwear brand: product grid, cart, checkout, and card payment via [Robokassa.kz](https://robokassa.kz). Built with Next.js (App Router), Tailwind CSS v4, and Supabase Postgres. Trilingual: Russian (default), Kazakh, English.

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in the values below
npm run dev                        # http://localhost:3000 -> redirects to /ru
npm test                           # Robokassa signature unit tests
```

The catalog (products, prices, texts) lives in `src/lib/products.ts`. Product images live in `public/products/`; replace the placeholder SVGs with real photos using the same file names (or edit the `images` paths in the catalog).

## Setup checklist

### 1. Supabase (orders database)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql` once.
3. Copy Settings -> API values into `.env.local`:
   - `SUPABASE_URL` = Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = service_role key (server-only; never expose it to the client)

### 2. Robokassa.kz (payments)

1. Register a shop at [robokassa.kz](https://robokassa.kz) and open Technical Settings.
2. Copy into `.env.local`: `ROBOKASSA_MERCHANT_LOGIN`, `ROBOKASSA_PASSWORD1`, `ROBOKASSA_PASSWORD2`.
   While `ROBOKASSA_IS_TEST=1`, use the **test** passwords (they are configured separately).
3. In the cabinet, set the URLs (method POST for Result URL):
   - Result URL: `https://your-domain/api/robokassa/result`
   - Success URL: `https://your-domain/ru/payment/success`
   - Fail URL: `https://your-domain/ru/payment/fail`
4. Hash algorithm must be MD5 (the default).

To test the callback locally, expose the dev server with a tunnel
(`cloudflared tunnel --url http://localhost:3000` or ngrok) and put the tunnel
URL into the cabinet as the Result URL.

### 3. Deploy (Vercel)

1. Push the repo to GitHub and import it in Vercel.
2. Add all `.env.local` variables in Project Settings -> Environment Variables; set `NEXT_PUBLIC_SITE_URL` to the production URL.
3. After going live, switch `ROBOKASSA_IS_TEST` to `0` and replace test passwords with production ones.

## How payment works

1. `POST /api/orders` validates the cart, recomputes the total from `src/lib/products.ts` (client prices are never trusted), inserts a `pending` order in Supabase, and returns a signed Robokassa payment URL (`MD5(MerchantLogin:OutSum:InvId:Password#1)`).
2. The customer pays on Robokassa. Robokassa calls `/api/robokassa/result`; the handler verifies `MD5(OutSum:InvId:Password#2)` and the amount, marks the order `paid`, and answers `OK{InvId}`. This callback is the only thing that confirms payment.
3. The customer is redirected to the success page, which verifies the Password#1 redirect signature and shows "paid" or "processing" based on the database status.
