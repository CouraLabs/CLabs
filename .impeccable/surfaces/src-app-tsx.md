---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["index.html"]
---

# couralabs.dev hub

Scope: the CouraLabs studio hub (single page, `src/`). Visitor mode: Persuade.
Audience: developers first, future hosted-service users, then people hiring. Job: understand what CouraLabs ships, pick a project, go to its repo or subdomain; hirers go to LinkedIn.
Proof: three real repos (Codeboros pre-release, OpenMixing, OpenHouse) and their READMEs. No stats, stars, testimonials.
Constraints: EN/PT equal, Cloudflare static, dark + light themes (OS default, toggle), plain professional wording (no game vocabulary), contact = LinkedIn + GitHub org.
Unresolved: final logo; whether hosted versions launch on the project subdomains.

## Direction contract

THESIS: Glass is a lens, not a finish. Each project is one geometric primitive; looking at a project means sliding its form behind a pane of frosted glass until its colour fills the pane. Refuses the split hero and the row of three equal cards.
OWN-WORLD: Three primitives on a quiet ground: Codeboros a ring with a gap that slowly turns (the loop), OpenMixing two overlapping discs (two decks blending), OpenHouse a triangle over a square. Coral, indigo and mint on ink-blue (dark) or cool porcelain (light). Frosted panes: thin bright edge, offset soft shadow, pointer-following specular. Jost for every voice, Geist Mono only for real commands. Pill controls, 28px pane radius, one hairline weight.
STORY: The visitor reads the thesis, sees three forms, hovers one and watches it slide under the glass, opens its details, believes them because each line traces to a repo, and leaves via GitHub, a subdomain or LinkedIn.
FIRST VIEWPORT: Ground with the three primitives drifting at large scale. A single glass slab left of centre carries the headline, the one-line sub, the three-project index (glyph, name, kind, status) and the two actions; the primitives cross its edges so they read crisp outside, blurred inside. Glass pill nav at top.
FORM: Pinned by the user (geometric, glassmorphism, minimalist, animated); replaces the pixel game world, which is now anti-reference. seed: none (pinned by the user; no roll was run for this direction). User confirmed 2026-10-28: "Yes, it's final" (no concept roll). The roll recorded in .impeccable/questions/roll.json (seed:33961f7160043f1f) belongs to the retired pixel direction, not this one.
Signature interaction: hovering or focusing a project (hero index or project list, keys 1-3) glides its primitive behind the glass and tints the pane; the project stage morphs between primitives on selection.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
