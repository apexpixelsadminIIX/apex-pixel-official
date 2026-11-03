# Apex Pixels website — roadmap

Prompt 1 of 5 is complete (foundation, design system, shared components, Home page, placeholder routes).

- [x] Prompt 1 — Foundation: design system, site.ts config, navbar, WhatsApp button, ContactTrio, footer, scroll progress, 404, Home page, placeholder routes
- [ ] Prompt 2 — Inner pages: Services, Work, case studies, About, Contact, Privacy, Terms (replace PlaceholderPage routes)
- [ ] Prompt 3 — Motion and animation (framer-motion: hero, stripes, marquee, scroll reveals)
- [ ] Prompt 4 — Contact form and booking link (bookingUrl in site.ts is empty until this prompt)
- [ ] Prompt 5 — SEO, metadata polish, static build/deploy pass

Notes for later prompts:
- All editable facts live in src/config/site.ts — never hard-code a fact twice.
- Placeholder routes use src/components/site/PlaceholderPage.tsx and each declares its own head() metadata; replace, do not delete, the head() when building real pages.
- PricingGrid(showFeatures) is shared between Home and Services.
- Voice rules: third person "Apex Pixels"; "I" only on About (founder Manish. S); forbidden words list in the brief.
