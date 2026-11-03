<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

<!-- APEX PIXELS:BEGIN -->
## Apex Pixels site conventions

- This is a TanStack Start project, so routing uses @tanstack/react-router file routes (not React Router, per brief); navigation goes through src/components/site/SmartLink.tsx which parses "/path?query" and "/path#hash" hrefs.
- Every editable business fact (contacts, prices, packages, FAQs, nav) lives in src/config/site.ts; components import from it and never hard-code facts.
- Design tokens (exact brand hexes, section tones, stripe motif utilities) are defined in src/styles.css; sections use tone-dark/tone-light instead of per-component colors. Orange is the only button accent and always carries dark ink text.
- Inner routes currently render PlaceholderPage; later prompts replace each placeholder but must keep the route's head() metadata.
- The multi-prompt build plan is tracked in roadmap.md.
<!-- APEX PIXELS:END -->
