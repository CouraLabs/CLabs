---
name: CouraLabs
description: Three geometric primitives seen through a lens of frosted glass, in black and white.
colors:
  white-ink: "#f4f4f4"
  codeboros-dark: "#ececec"
  codeboros-hi-dark: "#ffffff"
  openmixing-dark: "#a8a8a8"
  openmixing-hi-dark: "#e2e2e2"
  openhouse-dark: "#737373"
  openhouse-hi-dark: "#b8b8b8"
  codeboros-light: "#121212"
  codeboros-hi-light: "#555555"
  openmixing-light: "#5c5c5c"
  openmixing-hi-light: "#a3a3a3"
  openhouse-light: "#8c8c8c"
  openhouse-hi-light: "#c8c8c8"
  ink-ground: "#0a0a0a"
  ink-ground-raised: "#131313"
  ink-text: "#f4f4f4"
  ink-text-muted: "#b3b3b3"
  ink-text-faint: "#8f8f8f"
  ink-hairline: "rgb(244 244 244 / 0.12)"
  ink-glass: "rgb(30 30 30 / 0.42)"
  ink-glass-strong: "rgb(30 30 30 / 0.66)"
  ink-glass-edge: "rgb(255 255 255 / 0.14)"
  wordmark-soft-dark: "#a3a3a3"
  white-ground: "#f2f2f2"
  white-ground-raised: "#e7e7e7"
  black-ink: "#0a0a0a"
  white-text-muted: "#444444"
  white-text-faint: "#5e5e5e"
  white-hairline: "rgb(10 10 10 / 0.12)"
  white-glass: "rgb(255 255 255 / 0.46)"
  white-glass-strong: "rgb(255 255 255 / 0.7)"
  white-glass-edge: "rgb(255 255 255 / 0.8)"
  wordmark-soft-light: "#686868"
typography:
  display:
    fontFamily: "Jost Variable, Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.4vw, 4.9rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Jost Variable, Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 4.2vw, 3.6rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.032em"
  title:
    fontFamily: "Jost Variable, Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 3.6vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.032em"
  title-sm:
    fontFamily: "Jost Variable, Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Jost Variable, Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Jost Variable, Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  control:
    fontFamily: "Jost Variable, Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.2
  label:
    fontFamily: "Jost Variable, Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.86rem"
    fontWeight: 500
    lineHeight: 1.6
  mono:
    fontFamily: "Geist Mono Variable, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.86em"
    fontWeight: 400
    fontFeature: "tnum"
rounded:
  key: "7px"
  row: "14px"
  tab: "22px"
  pane: "28px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 5vw, 72px)"
  pane-padding: "clamp(28px, 4vw, 52px)"
  section-top: "clamp(104px, 13vw, 176px)"
  section-head-gap: "clamp(36px, 5vw, 56px)"
  column-gap: "clamp(24px, 4vw, 64px)"
  actions-gap: "12px"
  container-max: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.ink-text}"
    textColor: "{colors.ink-ground}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "#ffffff"
  button-primary-light:
    backgroundColor: "{colors.black-ink}"
    textColor: "#f4f5f9"
  button-primary-light-hover:
    backgroundColor: "#262a3a"
  button-glass:
    backgroundColor: "{colors.ink-glass}"
    textColor: "{colors.ink-text}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-glass-hover:
    backgroundColor: "{colors.ink-glass-strong}"
  glass-pane:
    backgroundColor: "{colors.ink-glass}"
    rounded: "{rounded.pane}"
    padding: "{spacing.pane-padding}"
  nav-bar:
    backgroundColor: "{colors.ink-glass}"
    rounded: "{rounded.pill}"
    padding: "8px 8px 8px 20px"
    height: "58px"
  nav-link:
    textColor: "{colors.ink-text-muted}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  nav-link-hover:
    backgroundColor: "{colors.ink-hairline}"
    textColor: "{colors.ink-text}"
  tool-button:
    rounded: "{rounded.pill}"
    size: "42px"
  project-tab:
    rounded: "{rounded.tab}"
    padding: "18px 18px 18px 20px"
  project-tab-selected:
    backgroundColor: "{colors.ink-glass-strong}"
  chip:
    textColor: "{colors.ink-text}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  status-pill:
    rounded: "{rounded.pill}"
    padding: "6px 14px 6px 12px"
  key-cap:
    textColor: "{colors.ink-text-faint}"
    rounded: "{rounded.key}"
    padding: "2px 7px"
---

# Design System: CouraLabs

## Overview

**Creative North Star: "The Lens Over Three Forms"**

Glass is a lens, not a finish. The whole system is a quiet ground carrying exactly three geometric primitives, one per project, with frosted panes set over them. Tone lives in the primitives; the glass shows it. A primitive read crisp outside a pane and blurred inside it is the system's single visual idea, and every surface either holds a pane, shows a primitive, or stays out of the way. Codeboros is a ring with a gap that slowly turns, OpenMixing two overlapping discs, OpenHouse a triangle roof over a square.

Density is low and the voice is calm: one humanist geometric sans (Jost) at medium weight for every voice, generous section spacing, pill controls, one hairline weight. Motion is slow and eased: primitives drift on 19 to 90 second loops, panes rise in over 1.3 seconds, and focusing a project glides its primitive under the glass while the pane tints toward its colour. The system ships in two equal themes, black and white, with the same primitives a step deeper in light.

The retired pixel/game world is the confirmed anti-reference: no pixel art, no game vocabulary, no stepped or bitmap rendering.

**Key Characteristics:**
- Three primitives, three gray tones, one per project; the whole interface is black and white.
- Frosted panes: translucent fill, 26px backdrop blur with 165% saturation, thin bright edge, inset top highlight, soft offset shadow, pointer-following specular.
- Jost 500 for every heading and control; Geist Mono only for real commands and code.
- Pills for controls (999px), 28px for panes, 1px hairlines only.
- Dark and light themes are peers, switched by `data-theme`, defaulting to the OS. The switch opens the new theme as a circle from the pressed button (View Transitions, off under reduced motion).

## Colors

Strictly black and white. The ground and ink swap with the theme; every project primitive is a tone of gray, told apart by form and by lightness, never by hue.

### Neutral
- **Ink Ground** (ink-ground, #0a0a0a) in dark and **White Ground** (white-ground, #f2f2f2) in light; each has a raised second step.
- **Text, Muted, Faint**: white-ink on black, black-ink on white, with true-gray secondary steps. No tint in any gray.
- **Hairline**: text colour at 12% alpha, the only divider and outline colour.
- **Glass, Glass Strong, Glass Edge**: neutral translucent fills and the 1px bright rim.

### Primitive tones
Each project keeps a base tone and a lighter `-hi` step for the shaded gradient on background-scale shapes. Codeboros is the strongest tone (white in dark, near-black in light), OpenMixing the middle, OpenHouse the quietest. In text, project tones resolve to the `-ink` step.

### Wordmark
"Coura" is set in the soft gray (wordmark-soft) at weight 500; "Labs" is full text colour at 600, so it reads white on the black theme and black on the white theme.

### Named Rules
**The Two Colours Rule.** The interface is black and white. Focus rings, selection and the caret use the text colour; selection inverts to text-on-ground. No hue is introduced anywhere, including status dots.

**The Lens Rule.** Panes are never filled solid. They take tone from what sits behind them, plus the faint project-tone sheen.

## Typography

**Display Font:** Jost Variable (with Jost, ui-sans-serif, system-ui)
**Body Font:** Jost Variable (same stack)
**Label/Mono Font:** Geist Mono Variable (with ui-monospace, SF Mono, Menlo), code and key commands only

**Character:** One geometric humanist voice from headline to footnote; hierarchy comes from size and tight negative tracking, not from changing family or shouting weight.

### Hierarchy
- **Display** (500, clamp(2.6rem, 5.4vw, 4.9rem), 1.02, -0.035em): the hero headline, balanced, capped at 12.5ch. The person's name in About and the contact headline sit on the same tier (clamp to 4.1rem and 4.4rem). On mobile the hero drops to clamp(2.2rem, 9.6vw, 2.8rem).
- **Headline** (500, clamp(2.3rem, 4.2vw, 3.6rem), 1.05, -0.032em): section titles.
- **Title** (500, clamp(2.1rem, 3.6vw, 3rem), 1.05, -0.032em): the project name inside the stage pane.
- **Title Small** (500, 1.3rem, 1.25, -0.015em): project names in the list; 1.18rem in the hero index.
- **Lead** (400, 1.125rem, 1.6): section and hero subcopy in muted text, 44 to 52ch, `text-wrap: pretty`.
- **Body** (400, 1.0625rem, 1.6): running copy, max 60 to 62ch.
- **Control** (500, 1rem, 1.2): buttons; nav links at 0.98rem.
- **Label** (500, 0.86rem): fact terms and list titles, sentence case, in faint text.

### Named Rules
**The One Voice Rule.** Jost speaks every role. Geist Mono appears only where the text is a real command, path or key (`code`, `kbd`).

**The Medium Ceiling Rule.** Headings and controls are weight 500. 600 is reserved for the wordmark and the two-letter tool buttons. Nothing is set in uppercase.

## Layout

Content sits in a 1240px container with a fluid gutter (clamp(20px, 5vw, 72px)). Sections open with large fluid top padding (clamp(104px, 13vw, 176px)) and a heading block capped at 640px. Two-column sections use an asymmetric grid, a narrow left column (minmax(260px, 0.78fr)) against a wide right (1.6fr), with a fluid column gap; the project list in the left column is sticky at 108px.

The hero is a full-viewport (100svh) field: primitives positioned absolutely by viewport units at large scale behind a single glass slab (max 700px) aligned to the container's left edge. The contact section repeats the field-and-slab pattern, centred. Primitives must cross pane edges so they read crisp outside and blurred inside.

Breakpoints: at 1100px the field recomposes; at 900px two-column grids stack and the project list becomes a three-up row of name-only tabs; at 720px the hero aligns to the top with the primitives clustered above the slab, the index row folds its description onto a second line and fact grids go single column; at 480px action buttons stretch to fill.

## Elevation & Depth

Depth is material, not stacked cards: a flat ground, primitives at the back, and frosted glass in front. A pane earns its lift from translucency, backdrop blur, a bright 1px rim, an inset top highlight and a long, soft, downward shadow. Shadows are always soft and offset downward with negative spread; there is no hard offset shadow.

### Shadow Vocabulary
- **Pane shadow, dark** (`box-shadow: 0 30px 70px -30px rgb(0 0 0 / 0.7), 0 2px 10px -4px rgb(0 0 0 / 0.4)`): every glass slab, panel and the nav.
- **Pane shadow, light** (`box-shadow: 0 30px 70px -34px rgb(0 0 0 / 0.38), 0 2px 10px -4px rgb(0 0 0 / 0.14)`): the same, neutral black for white.
- **Glass rim** (`box-shadow: inset 0 1px 0 var(--glass-top)`): top highlight on panes, glass buttons and selected tabs.
- **Primary button** (`box-shadow: 0 10px 24px -14px rgb(0 0 0 / 0.6)`, deepening on hover): the solid action's small lift.

### Named Rules
**The Frosted Slab Rule.** Anything that floats is glass: translucent fill, backdrop blur, 1px bright edge, inset top highlight, soft long shadow. There is no opaque floating card.

**The Specular Rule.** Panes carry a 460px radial highlight that follows the pointer (`--mx`, `--my`), fading out by 62%.

## Shapes

Two radii carry the system: pills (999px) for every control, chip, badge, nav bar and status, and 28px for every pane. Intermediate radii are reserved for nested rows: 22px for project tabs (18px on narrow screens), 14px for hover rows in the hero index, 7px for key caps and inline code. Borders are always 1px, either hairline or glass edge.

The three primitives are the system's geometry and are drawn on a 100-unit box: a ring (r36, stroke 16, round caps, an 84/16 dash) rotated -62deg, two r29 discs with the right one at 62% opacity, and a roof triangle over a square with 4-unit rounded joins. At background scale they take a 155deg gradient from the `-hi` step to the base tone; as glyphs they are flat. List bullets are 7px squares rotated 45deg, filled with the project tone.

**The Roof Up Rule.** Wherever glyphs turn on hover or selection, the house never rotates.

## Components

### Buttons
Calm, solid or glass, always pill.
- **Shape:** full pill (999px), 48px tall, 22px side padding, 10px gap to a trailing 18px arrow.
- **Primary:** a solid inverse of the theme, text colour as fill with ground-coloured label, with a small soft shadow. Hover lifts 1px, brightens and deepens the shadow; the arrow slides 3px right.
- **Glass:** glass fill with glass-edge border, rim highlight and a lighter 14px backdrop blur; hover moves to Glass Strong.
- **Disabled:** glass button in muted text with `not-allowed`, carrying a small hairline "soon" pill.
- **Text link button:** muted text whose underline fades in on hover (footer tools).

### Chips
- **Style:** transparent with 1px hairline border, pill, 8px 16px, 0.98rem (skills list).
- **Status pill:** the same hairline pill at 0.94rem/500 led by an 8px dot in the project tone with a slow 2.6s ping ring.

### Cards / Containers
- **Corner Style:** 28px.
- **Background:** Glass; the project panel layers an 12% project-tone gradient over it.
- **Shadow Strategy:** pane shadow plus rim (see Elevation & Depth).
- **Border:** 1px glass edge.
- **Internal Padding:** clamp(28px, 4vw, 52px); contact pane clamp(36px, 5vw, 64px).
- **Facts:** a three-column definition grid under a hairline, faint 0.86rem terms over 1rem values; single column on mobile.

### Navigation
- **Style:** a fixed glass pill bar 14px from the top, 58px tall, inside the container width; it shifts to Glass Strong once the page scrolls.
- **Brand:** the CL monogram (a squared C open to the right, a stem hanging from its top bar, the bottom bar running on as the L foot; round caps, 14-unit stroke) plus the two-tone wordmark at 1.16rem. The monogram draws on at load; on hover the stem drops and settles once while the C stays put. The same monogram ships as favicon.svg and logo.svg, both following the OS colour scheme.
- **Links:** muted pills (8px 16px) that take a hairline fill and full text colour on hover.
- **Tools:** 42px circular hairline buttons for language and theme; the theme button is dropped under 420px (the footer carries both).

### Project Index (signature)
The hero list of projects: a 24px flat glyph, name, kind, ink-step status badge and arrow per row, divided by hairlines. Hover or focus tints the row with 9% of the project tone, turns the glyph 90deg and scales it 1.12, slides the arrow 4px, and glides that project's primitive under the hero glass while the other two fade to 32%.

### Project Tabs and Stage (signature)
A vertical tablist (keys 1 to 3) beside a glass panel. Unselected tabs are transparent with desaturated, 55% opacity glyphs; the selected tab becomes a Glass Strong pill-card with rim and shadow and its glyph returns to full colour. Behind the panel, the stage swaps primitives with a scale-and-rotate morph (0.55 and -40deg to rest) and the panel body re-enters with a short rise and blur.

## Do's and Don'ts

### Do:
- **Do** give every project exactly one primitive and one gray tone, and keep those pairings fixed (ring strongest, discs middle, house quietest).
- **Do** let primitives cross pane edges so the lens reads: crisp outside, blurred inside.
- **Do** build anything that floats as glass: glass fill, 1px glass edge, inset top highlight, pane shadow, 28px radius.
- **Do** use pills (999px) for every control, chip and badge.
- **Do** use the `-ink` step whenever a project tone is set as text.
- **Do** ship both themes from the same tokens, switching with `data-theme`.
- **Do** ease with cubic-bezier(0.16, 1, 0.3, 1) and keep motion slow; respect reduced motion.

### Don't:
- **Don't** reintroduce the retired pixel/game world: no pixel art, bitmap fonts, stepped shapes or game vocabulary.
- **Don't** introduce any hue; the palette is black, white and true gray.
- **Don't** fill a pane with a solid project tone.
- **Don't** set Geist Mono on anything that is not a real command, path or key.
- **Don't** use weights above 500 for headings, or uppercase tracked labels.
- **Don't** use hard offset shadows or opaque floating cards.
- **Don't** add a border heavier than 1px.
- **Don't** rotate the house glyph.
