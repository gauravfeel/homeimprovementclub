# HIC typography

Replaces Georgia/Arial with Source Serif 4/Source Sans 3. The approved colours, imagery and page compositions remain.

## Selection

Compared three directions using actual HIC copy and the requested brand criteria:

| Pairing | Assessment |
| --- | --- |
| Source Serif 4 + Source Sans 3 | Selected. Warm, assured serif construction; complementary understated sans. Clear contrast between architectural headings and functional UI, readable numerals and compact labels. Strong large and small rendering without highly decorative shapes. |
| Newsreader + Source Sans 3 | Strong editorial character and readable body, but more publication-led and expressive than HIC needs. |
| Lora + Public Sans | Warm and practical, but the serif's more calligraphic details give less architectural restraint. |

Selection is a design judgment, not a claim of objectively superior fonts. The Source families provide established open-source distribution and compatible design intent. Both are available under the SIL Open Font License: [Source Serif](https://github.com/adobe-fonts/source-serif/blob/release/LICENSE.md), [Source Sans](https://github.com/adobe-fonts/source-sans/blob/release/LICENSE.md). Copies ship in `public/fonts`.

## Roles

| Role | Size / treatment |
| --- | --- |
| Hero/editorial display | Fluid 42–72px; Source Serif 4 regular; 1.12 line height |
| H1 | Fluid 40–64px; regular; balanced wraps; maximum 23ch |
| H2 | Fluid 32–50px; 1.16 line height; maximum 28ch |
| H3 | Fluid 24–32px; 1.23 line height |
| Body large | Fluid 18–20px; 1.6 line height; maximum 52ch |
| Standard body | Fluid 16–17px; 1.65 line height; maximum 65ch |
| Navigation, buttons, forms | 15px labels/actions, 16px inputs; 500 navigation / 600 actions and labels |
| Eyebrows and metadata | 13px, 600 weight, restrained 0.035–0.045em tracking; sentence case |
| Supporting text | 14px with comfortable line height |
| Captions | 12px; retained contrasting image-caption backgrounds |
| Sequence numerals | Lining, tabular figures; display family retained for large process numbers |

Heading tracking is relaxed from approximately -0.045/-0.058em to -0.02em. Small subheadings use -0.012em. Serif italics remain for existing editorial emphasis. No artificially light weights are used. Existing page-specific layouts compose these shared roles differently; About has a deliberate mobile italic wrap, kitchens retain the split opening, bathrooms their wide title/panorama, and the process keeps numbered stages.

Implementation lives in `src/typography.css`, with self-hosted faces in `src/fonts.css`. Existing page CSS uses shared size/family tokens. Tailwind and base CSS use the same families. Form fields retain native readability and controls retain their behaviours.

## Loading and performance

Source Serif uses the 32pt optical design at regular weight, with genuine italic. This fixed optical-size instance avoids downloading the much larger full optical/weight variable font. Source Sans is variable from 400–700.

Measured English-page font requests total **127,888 bytes (124.9 KiB)** across serif regular, serif italic and sans. Latin Extended files are available on demand through Unicode ranges; all six font assets total 272,612 bytes. Other scripts use system fallback fonts rather than losing characters. The serif regular and sans Latin files are preloaded; all faces use `font-display: swap`. No third-party runtime font request, JavaScript font loader or package dependency was added. Compared with the previous system-font stack, this adds font bytes and a possible brief fallback-to-webfont swap.

## Validation

Desktop/mobile visual review covers home, About, kitchen, bathroom, process, exterior and contact, with further lighting samples. Browser checks confirm loaded font families and no document/heading overflow in 32 route/viewport combinations at 320, 390, 720 and 1440px. The 720px/2x context checks reflow equivalent to a 1440px browser at 200% zoom; it is not a manual browser zoom test.

Existing route/navigation/form/conversion browser suite passed all 28 combinations. TypeScript app/Node checks, five unit tests and production build passed. Lint has zero errors and seven pre-existing shadcn React Refresh warnings.

Typography skill diagnostic: initial 7/10 (undersized body copy, inconsistent wraps, unconfirmed zoom); final 9/10. The remaining conservative limitation is no manual browser-zoom verification; equivalent reflow was checked. Font-budget pass refers to the measured English-page payload, not the sum of every optional language file.

Screenshots and measured font data: `artifacts/typography/`. Run `node scripts/typography-qa.mjs` with the local Vite server running. No deployment or tracking logic changes were made in this typography pass.
