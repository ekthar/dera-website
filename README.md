# Dera Business Solutions — website

The corporate website for **Dera Business Solutions**, Kazhakuttam, Thiruvananthapuram, Kerala
(GSTIN 32BAOPD9925J1ZF), in business since 2013. It presents the company's services and how to
reach the business.

Monochrome design system, editorial typography, and a restrained motion language built with
Next.js App Router, React 19, TypeScript, Tailwind CSS 4 and Motion.

## Pages

| Route             | Purpose                                                                |
| ----------------- | ---------------------------------------------------------------------- |
| `/`               | Home: hero, introduction, capabilities, approach, location, CTA        |
| `/services`       | All six service areas with value, use cases and contact links          |
| `/about`          | Company profile and business details                                   |
| `/contact`        | Validated contact form and business details                            |
| `/privacy-policy` | Privacy policy                                                         |
| `/terms`          | Terms of use                                                           |

Generated routes: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`,
`/apple-icon`, `/icon.svg`, `/favicon.ico`, and `POST /api/contact`.

## Requirements

- Node.js 20.9 or newer (developed on Node 24)
- npm 10 or newer

## Install

```bash
npm install
cp .env.example .env.local   # optional; every variable is optional
```

## Develop

```bash
npm run dev            # http://localhost:3000
npm run lint
npm run typecheck
```

## Production build

```bash
npm run build
npm run start          # serves the production build on port 3000
```

All six pages are prerendered as static HTML at build time. Only `POST /api/contact` runs on
the server per request.

## Environment variables

See [`.env.example`](./.env.example) for the full list. Summary:

| Variable                                   | Effect when set                                              |
| ------------------------------------------ | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                     | Production origin for canonical URLs, Open Graph and sitemap |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Turns on contact form email delivery         |
| `NEXT_PUBLIC_CONTACT_EMAIL`                | Shows a public email address                                 |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_X_URL` | Adds footer social links   |

`NEXT_PUBLIC_*` values are read at build time. Rebuild after changing them. Set
`NEXT_PUBLIC_SITE_URL` before the production build, otherwise canonical URLs point to
`http://localhost:3000`.

### Contact form delivery

The form validates on the client and again on the server (`src/lib/contact.ts` holds the shared
rules). Delivery uses the [Resend](https://resend.com) HTTP API through `fetch`, so no SDK is
installed.

**Until all three email variables are set**, the contact page shows a notice that online
submission is not connected, the form never reports a message as sent, and `/api/contact`
returns `503 {"ok":false,"reason":"not-configured"}`.

To connect it:

1. Create a Resend account and verify the sending domain.
2. Create an API key with send permission.
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (your inbox) and `CONTACT_FROM_EMAIL`
   (an address on the verified domain).
4. Rebuild and deploy.

The route has a honeypot field, a 16 KB body limit and a per-instance rate limit of five requests
per ten minutes per IP. On serverless hosts each instance keeps its own counter, so add a
platform-level rate limit for stronger protection. To use a different provider, replace
`sendContactEmail` in `src/lib/email.ts`.

## Deployment

**Vercel (recommended).** Import the repository, keep the default Next.js settings, add the
environment variables, and deploy.

**Any Node.js host.**

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://your-domain npm run build
PORT=3000 npm run start
```

Put a reverse proxy with HTTPS in front (for example Nginx or Caddy), and forward
`X-Forwarded-For` so the contact rate limit sees real client addresses.

## Project structure

```
src/
  app/                 routes, metadata files, API route, global styles
  components/
    brand/             DERA wordmark and monogram (SVG geometry)
    navigation/        floating nav and fullscreen mobile menu
    footer/            footer with brand signature
    layout/            page hero, legal page layout, JSON-LD
    sections/          home, services and shared sections
    motion/            reusable reveal, mask, parallax, magnetic and page transition
    illustrations/     hero composition, service drawings, location map
    contact/           contact form
    ui/                buttons, primitives, spotlight card
  config/              business facts, navigation, services
  lib/                 SEO helpers, contact validation, email delivery, OG artwork
  types/
public/brand/          standalone SVG brand assets
scripts/               favicon generator
```

### Editing content

- **Business facts** (name, GSTIN, address, phones, WhatsApp, since year): `src/config/site.ts`
- **Navigation and sitemap routes**: `src/config/navigation.ts`
- **Services**: `src/config/services.ts`

## Brand assets

The letterforms are drawn on a 20-unit grid with a 5-unit stroke. Each stem is separated from
its bowl or bars by a 2-unit gap.

| Asset                | Location                                   |
| -------------------- | ------------------------------------------ |
| DERA wordmark        | `public/brand/dera-wordmark.svg`, `DeraWordmark` |
| Monogram             | `public/brand/dera-monogram.svg`, `DeraMonogram` |
| Favicon              | `src/app/icon.svg`, `src/app/favicon.ico`  |
| Apple touch icon     | `src/app/apple-icon.tsx`                   |
| Open Graph image     | `src/app/opengraph-image.tsx`              |
| Footer signature     | `SiteFooter`, full-width wordmark          |

After editing `src/app/icon.svg`, regenerate the ICO with `npm run brand:favicon`.

## Accessibility and motion

- Targets WCAG 2.2 AA: semantic landmarks, skip link, visible focus rings, labelled controls,
  inline error messages linked with `aria-describedby`, and a focus-trapped mobile menu.
- Secondary text uses at least 60% white on dark surfaces to keep contrast above 4.5:1.
- `prefers-reduced-motion` removes movement: Motion drops transforms, CSS loops stop, and the
  hero orbit animation pauses. `prefers-reduced-transparency` makes glass surfaces solid.
- Scroll-linked effects read the scroll position; they never take over scrolling.

## Before launch

- Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- Connect email delivery, or add a verified public email or phone.
- Have the privacy policy and terms reviewed by a legal adviser.
