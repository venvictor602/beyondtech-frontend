# GUS — Corporate website

Marketing site for **GUS**, the technology and systems arm of the Grounds Up group. Built as a **separate project** from the [Grounds Up](../GROUNDS-UP) B2B storefront, using the same core stack.

## Stack

- **Next.js** 16 (App Router), **React** 19, **TypeScript**
- **Tailwind CSS** v4, **Framer Motion**, **Lucide React**
- **TanStack Query** for contact form mutations
- Content in **`src/data/*.json`** (services, projects, team, clients, careers)

## Setup

```bash
cd gus
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) (port **3001** so it can run beside Grounds Up on 3000).

| Script          | Purpose          |
| --------------- | ---------------- |
| `npm run dev`   | Dev server :3001 |
| `npm run build` | Production build |
| `npm run lint`  | ESLint           |

**Node:** `>=20.9.0`

## Pages

| Route                | Content                                                 |
| -------------------- | ------------------------------------------------------- |
| `/`                  | Home — hero, stats, services/projects previews, clients |
| `/about`             | Company story & values                                  |
| `/services`          | Service catalog                                         |
| `/services/[slug]`   | Service detail                                          |
| `/projects`          | Case studies                                            |
| `/projects/[slug]`   | Project detail                                          |
| `/team`              | Leadership & delivery team                              |
| `/clients`           | Client sectors                                          |
| `/careers`           | Open roles                                              |
| `/careers/[slug]`    | Role detail                                             |
| `/contact`           | Enquiry form → `/api/contact`                           |
| `/privacy`, `/terms` | Legal                                                   |

## Environment

| Variable                     | Purpose                            |
| ---------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Canonical URL & sitemap            |
| `NEXT_PUBLIC_API_BASE_URL`   | Contact form backend (`/contact/`) |
| `NEXT_PUBLIC_TWITTER_HANDLE` | Twitter card metadata              |

## Related projects

- **Grounds Up storefront:** `../GROUNDS-UP` — B2B eCommerce (includes a GUS case study for the procurement platform)

## Customisation

Edit copy and listings in:

- `src/data/site.json` — brand, contact, stats, values
- `src/data/services.json`
- `src/data/projects.json`
- `src/data/team.json`
- `src/data/clients.json`
- `src/data/careers.json`

Replace placeholder emails, LinkedIn URLs, and team photos before production launch.
