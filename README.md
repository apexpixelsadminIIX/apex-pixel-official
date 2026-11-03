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
