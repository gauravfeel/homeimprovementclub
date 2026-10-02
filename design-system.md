# HIC design system

Extracted from the live Home Improvement Club marketing site. Ivory field, forest CTA, Source Serif 4 headings, Source Sans 3 body, square corners, 1px `--line` rules. No new hues, radii, or drop shadows.

## 1. Design philosophy

The site is an editorial builder brand, not a SaaS product. Surfaces stay ivory. Actions stay forest. Type carries hierarchy. Borders carry structure. Motion is short (`180ms`–`320ms`) and the image zoom is `1.03`.

When two patterns conflict, keep the marketing CSS in `redesign.css` / `typography.css`. Shadcn primitives must match that language.

## 2. Color tokens

Brand hex lives in `src/palette.css`. Tailwind semantic channels live in `src/index.css` as HSL components (`hsl(var(--primary))`).

| Role | Token | Source |
| --- | --- | --- |
| Background | `--background` | ivory `#f4f1e9` |
| Foreground | `--foreground` | ink `#263d30` |
| Surface | `--surface` | ivory-bright |
| Elevated surface | `--surface-elevated` | stone |
| Muted | `--muted` / `--muted-foreground` | stone / ink-muted |
| Border / input | `--border` `--input` | line |
| Primary | `--primary` | forest |
| Primary foreground | `--primary-foreground` | on-forest |
| Secondary | `--secondary` | sand / sage-wash |
| Accent fill | `--accent` | sage-wash |
| Accent text | `--sage` | sage |
| Success | `--success` | forest (same as primary) |
| Warning | `--warning` | ink-warm |
| Destructive | `--destructive` | existing form/toast red |
| Focus | `--ring` / `--focus-ring` | `#56735a` |
| Overlay | `--overlay` | forest-dark at 78% |

Do not add purple, blue sidebar defaults, or extra greens.

## 3. Typography scale

Families: `--font-display` Source Serif 4 (400), `--font-body` Source Sans 3 (400–700).

| Role | Token |
| --- | --- |
| Display / hero | `--type-display` |
| Page heading | `--type-h1` |
| Section heading | `--type-h2` |
| Card heading | `--type-h3` |
| Lead | `--type-large` |
| Body | `--type-body` |
| UI / labels / nav | `--type-ui` |
| Small / buttons | `--type-small` |
| Eyebrow / meta | `--type-meta` |
| Caption | `--type-caption` |

Eyebrows: uppercase, sage, wide tracking. Headings: weight 400, slight negative tracking. `em` inside headings uses sage.

## 4. Spacing scale

`--space-1` through `--space-24` map to 4px units (`0.25rem` … `6rem`). Page gutters stay `max(56px, calc((100vw - 1296px) / 2))` via `.editorial-section`. Section block padding is about `100px` desktop, `48–60px` mobile. Controls: `min-height` 44px (text) or 54px (solid CTA).

## 5. Radius

`--radius-sm` … `--radius-xl` are `0`. `--radius-pill` is `999px` for the rare pill (legacy WhatsApp chip). Do not add `rounded-2xl` cards.

## 6. Elevation

`--shadow-sm` `--shadow-md` `--shadow-lg` are `none`. Sticky nav uses ivory-bright fill, not a shadow. Overlays use `--overlay`.

## 7. Component architecture

- Primitives: `src/components/ui/`
- Marketing sections: `src/components/sections/`
- Page CSS compositions: `src/redesign.css`, `src/page-compositions.css`
- Tokens: `src/palette.css`, `src/typography.css`, `src/motion.css`, `src/design-system.css`

Use `Button`, `Input`, `Select`, `Card`, `Alert`, `ImageCard`, `ServiceFeatureCard`, `SectionHeader`, `CTASection`.

## 8. Button variants

`Button` applies the existing `.solid-link` / `.text-link` classes.

- `primary` / `default` / `hero`: forest fill, ivory type
- `secondary` / `light`: ivory fill (for forest bands)
- `outline`: 1px line
- `ghost`: no fill, sage hover
- `destructive`: form error actions only
- `link` / `hero-outline`: underlined text CTA
- sizes: `sm` 44px, `default`/`lg` 54px, `icon` 44×44
- states: hover darkens forest, `:active` `translateY(1px)`, `:focus-visible` 2px `--focus-ring`, disabled 50% opacity, `loading` spinner

Use `<Button asChild><Link to="…">` for routes.

## 9. Form conventions

Shared class: `src/lib/control-class.ts`. Square, ivory, `--line` border, `--line-strong` hover, `--focus-ring` outline. Labels `font-weight: 600`. Required: visible `*` plus `required` on `FieldLabel`. Errors: `aria-invalid` + `FieldError` / `FormMessage`. Touch: 48px min field height.

## 10. Responsive conventions

Mobile first. No horizontal overflow (`html { overflow-x: clip }`). CTA rows wrap (`.hero-actions`). Type uses `clamp`. Component library `/ui/components` stacks grids; sticky TOC scrolls sideways.

Breakpoints in use: ~360, 760, 900, 1100, plus Tailwind `md`/`lg`.

## 11. Accessibility

Real buttons and links. Labels tied with `htmlFor`. Focus rings stay visible. Dialogs/sheets/drawers use Radix/Vaul focus trap. Icon buttons need `aria-label`. Do not encode state with color alone. `prefers-reduced-motion` already kills hero clip and image zoom in `motion.css`.

## 12. How to add a component

1. Reuse a primitive in `components/ui` or a section in `components/sections`.
2. Style with existing tokens, not new hex.
3. Add the live component to `/ui/components`.
4. Prefer `cn` + `cva`. Do not add another styling library.

## 13. Do not introduce

- New brand colors or gradients
- Soft SaaS cards, heavy shadows, glassmorphism
- Inter / Geist / default shadcn radius
- Fake testimonials, people, or streets
- Giant display type outside heroes
- Hover-only interaction with no keyboard path
