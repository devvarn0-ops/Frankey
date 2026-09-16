# ORISS IPInfo API

A Vercel-ready IP information API with API keys, credits and a simple admin panel.

## Features
- `GET /api/ip?key=KEY` — information for the caller's public IP.
- `GET /api/ip/8.8.8.8?key=KEY` — lookup a public IP.
- `GET /api/balance?key=KEY` — remaining credits.
- 1 successful lookup = 1 credit.
- Keys are stored as SHA-256 hashes; raw keys are shown only when created.
- Supabase provides persistent storage.
- Configurable upstream provider through `IPINFO_UPSTREAM`.
- Branding: ORISS IPInfo API / Developer @Oriss01 / Channel https://t.me/Digittalphantom

## Important
This project uses a configurable upstream IP-data provider. Check that provider's API terms and commercial/resale permissions before selling access to the data. For a fully independent data layer, replace `lookup_ip()` with your own licensed GeoIP database.

## Deploy to Vercel

1. Create a Supabase project.
2. Open Supabase SQL Editor and run `supabase.sql`.
3. Create a Vercel project from this folder.
4. Add these Vercel environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_TOKEN` (long random secret)
   - Optional: `IPINFO_UPSTREAM` (default is `https://ipwho.is/{ip}`)
5. Deploy.
6. Put the contents of `admin.html` in your project's public/static handling if desired, or add a separate admin route. The API core already contains the public API endpoints.

## Example
`GET https://YOUR-DOMAIN.vercel.app/api/ip/8.8.8.8?key=YOUR_KEY`

Response shape:
```json
{
  "success": true,
  "data": {
    "ip": "8.8.8.8",
    "country": "United States",
    "country_code": "US",
    "city": "...",
    "isp": "...",
    "asn": "...",
    "credits_remaining": 999
  }
}
```

## Security
- Never put the Supabase service-role key in browser JavaScript.
- Use a strong `ADMIN_TOKEN`.
- Consider adding rate limiting before production resale.
- Do not use the API to expose private/reserved IP information.
