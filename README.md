# APEX PIXEL official

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f4e605c2-7535-4867-8761-37512c03a466).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Setup

1. Create a free access key at web3forms.com using apexpixels.admin@gmail.com. Put it in a `.env` file in the project root as `VITE_WEB3FORMS_KEY=your-key`. Until a key exists, the enquiry form opens WhatsApp with the enquiry details instead.
2. Create a free Cal.com account, make a 15-minute event, and paste its link into `bookingUrl` in `src/config/site.ts`. Until then, the "Book a 15-minute call" buttons open WhatsApp with a call request.

## Deploy

This project builds with Nitro for Cloudflare, so it deploys as a Cloudflare Worker with static assets (free plan). No `_redirects` file is needed because the server handles every route.

1. Push the project to GitHub.
2. In the Cloudflare dashboard open Workers and Pages, create an application and import the GitHub repository.
3. Build command: `npm run build`. Deploy command: `npx wrangler deploy` (the build writes its Cloudflare config to `.output/server/wrangler.json`).
4. Under Variables, add `VITE_WEB3FORMS_KEY` (it must be set at build time, so add it before the first build).
5. When the domain is bought: attach it in Cloudflare, then update `siteUrl` in `src/config/site.ts` and replace `https://example.com` in `public/sitemap.xml` and `public/robots.txt`.
