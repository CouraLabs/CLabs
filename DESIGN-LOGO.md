# App logos

How to draw a CouraLabs app logo so it sits in the same family as Codeboros, OpenMixing and OpenHouse. The finished files live in [icons/](icons/).

| App | Idea | Drawing |
|---|---|---|
| Codeboros | The loop: an agent that keeps going around | An open ring, node at the open end |
| OpenMixing | Two decks blending | Two overlapping circles, the second dotted, node where they cross |
| OpenHouse | A home with shared books | A roof triangle over a square, node at the apex |

## The idea

Each logo is **one plotted primitive**: a line drawing made by a pen plotter, with one solid dot (the *node*) marking where the pen stopped or the important point of the shape. No letters, no fills except the node, no gradients, no shadows.

Start from what the app *does*, not from its name, and reduce it to one or two basic shapes: circle, arc, triangle, square, straight line. If a stranger needs the app's name to read the shape, it's fine. If they need it explained to see a clean shape, it's too complicated.

## Rules

1. **Canvas.** Draw in a 100 × 100 box. Keep the drawing inside roughly 12–88 on both axes and visually centered.
2. **Parts.** At most 2–3 strokes plus exactly one node. Build them from circles, arcs, and straight lines with `M`, `L`, `H`, `V`, `A` path commands.
3. **Stroke.** `stroke-width: 1.1` (in the 100-unit box), `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`.
4. **Node.** One filled circle, `r = 4.2`, no stroke. Put it on the drawing, never floating: at an open end, an apex, or an intersection.
5. **Dotted trace (optional).** For a second, "secondary" stroke: `stroke-width: 2.09` (1.9 × the line) and `stroke-dasharray: 0 <gap>`, where `gap = path length / dot count`. Aim for a gap of about 4.8 units (a circle of r=29 gets 38 dots: `0 4.795`). Use at most one dotted stroke per logo.
6. **Openness.** Prefer shapes that are open or overlapping (a gap in a ring, two circles crossing) over closed, static outlines. That's what makes them read as *being drawn*.
7. **No letters.** Don't work initials or letterforms into the mark. A B on Codeboros was tried and dropped: once a letter is in it, the letter becomes the logo.

## Colors

| Variant | Background | Ink (stroke + node) |
|---|---|---|
| Dark tile (default) | `#111111` | `#b0b0ad` |
| Light tile | `#e9e9e6` | `#464644` |
| Glyph | transparent | `currentColor` |

Monochrome only. Never give an app its own color.

## Files to produce

For an app called `<name>`, create three SVGs in `icons/`:

- `<name>.svg`: dark tile, 1024 × 1024, corner radius 230
- `<name>-light.svg`: light tile, same size
- `<name>-glyph.svg`: drawing only, transparent, `viewBox="-6 -6 112 112"` (the 100-unit box plus room for the node)

On the tiles the 100-unit drawing is scaled by 5.6 around the center, so it fills about 55% of the tile.

### Tile template

Replace the comment with your strokes and node, and swap the colors for the light tile.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="230" fill="#111111"/>
  <g fill="none" stroke="#b0b0ad" color="#b0b0ad" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" transform="translate(512 512) scale(5.6) translate(-50 -50)">
    <!-- strokes in the 100-unit box -->
    <circle cx="50" cy="12" r="4.2" fill="currentColor" stroke="none"/>
  </g>
</svg>
```

### Glyph template

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 112 112">
  <g fill="none" stroke="currentColor" color="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
    <!-- same strokes -->
    <circle cx="50" cy="12" r="4.2" fill="currentColor" stroke="none"/>
  </g>
</svg>
```

### Reference: the existing drawings

```svg
<!-- Codeboros -->
<path d="M66.9 18.2 A36 36 0 1 1 32.2 18.7"/>
<circle cx="66.9" cy="18.2" r="4.2" fill="currentColor" stroke="none"/>

<!-- OpenMixing -->
<circle cx="37" cy="50" r="29"/>
<circle cx="63" cy="50" r="29" stroke-width="2.09" stroke-dasharray="0 4.795"/>
<circle cx="50" cy="24.5" r="4.2" fill="currentColor" stroke="none"/>

<!-- OpenHouse -->
<path d="M50 12 L86 44 H14 Z"/>
<path d="M22 52 H78 V88 H22 Z"/>
<circle cx="50" cy="12" r="4.2" fill="currentColor" stroke="none"/>
```

## On the landing page

The site draws the same shapes in [src/Shape.tsx](src/Shape.tsx), using hairline strokes that stay the same width at any size, and animates them being plotted. To add an app there:

1. Add the app to `PROJECTS` and its copy in [src/content.ts](src/content.ts). `ProjectId` picks up the new id from `PROJECTS`.
2. Add a branch in `Shape.tsx` with the same path data. Mark the main strokes `data-plot` (drawn in), a dotted stroke `data-dots`, and the node `data-node`, each with `pathLength="1"` and `vectorEffect="non-scaling-stroke"`. Stroke widths and the dot pattern come from CSS.

## Checklist

- [ ] One idea from what the app does, as one or two basic shapes
- [ ] Fits 12–88 in the 100 box and looks centered
- [ ] Stroke 1.1, round caps and joins, no fills except the node
- [ ] Exactly one node, r 4.2, sitting on the drawing
- [ ] At most one dotted stroke
- [ ] No letters
- [ ] Sits comfortably next to the other three in a row (render them side by side)
- [ ] Dark, light and glyph files exported to `icons/`
- [ ] Added to `Shape.tsx` if it goes on the landing page

To check a new logo next to the existing ones:

```bash
for f in icons/*.svg; do rsvg-convert -w 300 "$f" -o "${f%.svg}.png"; done
```
