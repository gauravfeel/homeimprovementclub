# HIC redesign delivery

Implemented in the existing React/Vite codebase. No production deployment. The approved warm editorial design is retained; the second pass gives inner pages their own content architecture and composition.

## Design rationale

The original site relied on dark generic heroes, repeated cards and broad sales copy. Unsupported credibility claims, a placeholder review destination, geographic inconsistencies and a timed popup weakened trust. Kitchen and bathroom enquiries shared an overly broad form choice. The redesign uses specific homeowner planning questions, visible contact options and honest content instead.

The reference review informed quality rather than a copied layout: [GMatrix](https://www.gmatrix.ca/) for photography and typographic space, [Icon](https://www.wemakehomes.com/) for service and process clarity, and [Black Castle](https://blackcastlebuilds.com/) for architectural imagery and direct actions. HIC has not been given those businesses' project evidence or credentials.

The design system uses warm stone (#f6f3ed), forest green (#314d3e), generous spacing, fine rules and restrained rectangular buttons. The subsequent typography pass replaces Georgia/Arial with locally hosted Source Serif 4/Source Sans 3; see `TYPOGRAPHY.md` for the hierarchy and measured loading cost. Desktop compositions vary between editorial columns, panoramas, directories and planning sequences; mobile reflows each composition with readable type and accessible controls.

## Route-by-route changes

| Route | Composition and purpose |
| --- | --- |
| `/` | Broad brand overview: kitchen-led opening, short introduction, featured kitchen/bathroom paths, remaining services, lighting story, brief process, service area, questions and consultation action. Full overview sections remain here. |
| `/about` | An editorial explanation of HIC's supported business remit, connected renovation decisions and the homeowner's starting brief. A factual work/area/consultation panel replaces homepage service and process sections. No invented team or history. |
| `/services` | Six visual scope entries, quick jump navigation and a multi-room enquiry ending. Helps visitors compare services without repeating the homepage collection. |
| `/services/kitchen-cabinets` | Kitchen workflow questions, keeping versus rethinking a layout, cabinetry/storage/finishes imagery, disruption planning and kitchen-specific enquiry links. |
| `/services/bathrooms` | Wide bathroom panorama, visible finishes versus wet-area planning, household arrangements and bathroom questions. A different narrative and layout from kitchens. |
| `/services/lighting` | Visual editorial opening and interactive Ambient/Task/Accent selector, followed by interior/exterior contexts and a lighting brief action. |
| `/services/flooring` | Surface-led opening, material considerations, transitions and thresholds, preparation sequence and flooring questions. |
| `/services/hvac-electrical` | Planned renovation upgrades, separate heating/cooling and electrical workstreams, equipment coordination and official rebate resources. Copy does not position HIC as an emergency repair service. |
| `/services/exterior` | Facade panorama, condition-first scope directory, outdoor living story and exposure/access/timing questions. |
| `/how-it-works` | Detailed four-stage conversation/work sequence showing homeowner inputs and decisions, followed by consultation preparation. Replaces the homepage's abbreviated process. |
| `/areas-we-serve` | Eight-city geographic directory. City enquiry links preselect the contact location, followed by property-specific guidance. |
| `/contact` | Concise action page with service/city preselection, six service choices, optional budget uncertainty, labelled fields and clear success/error handling. Short enquiry opens on request. |
| `/rebates` | Official BC resource directory with no invented amounts, eligibility assurances or HIC participation claims. Ends with contextual systems planning. |
| `/testimonials` | Existing URL retained with an honest unpublished-stories state and useful next steps. No unverified quotes or ratings rendered. |
| `/contractors` | Existing disabled feature remains disabled and displays the branded not-found page. |
| Unknown routes | Branded, noindex recovery page with home/services links. |

## Architecture and functionality

`src/redesign.css` owns the approved visual language; `src/page-compositions.css` owns inner-page compositions. Six separate service-page components replace a universal service template. `ServiceDetail.tsx` handles routing and SEO. Small shared primitives cover breadcrumbs, image captions, enquiry links and questions. Full homepage sections are only imported by the homepage.

All existing public URL paths and the contractor feature flag are preserved. Navigation, phone links, WhatsApp and both Formspree flows remain. Route changes reset scroll while anchor links remain supported. Mobile navigation includes expanded state, Escape handling and focus return. Reduced-motion preferences are supported.

Existing HIC image assets are reused and captioned as design inspiration rather than claimed completed projects. The original logo is retained; a smaller derivative reduces the navigation logo from roughly 998 KB to 24 KB. No fabricated projects are shown. An empty verified-project data structure and hidden-until-populated gallery are ready for approved content. Historical testimonial data remains unused in the repository.

The previous timed popup now opens deliberately from the contact page. This is an intentional interaction change; its submission endpoint and conversion event remain.

## Tracking preserved and checked

- GTM: `GTM-KZJKRK4F`.
- Existing direct GA4 configuration: `G-H7T1HDT2KC`.
- Existing Meta bootstrap: `1965202054201900`.
- Phone and WhatsApp destination: `+1 236-380-4423`.
- Contact Formspree endpoint: existing `VITE_FORMSPREE_ID` override, fallback `xlgaonqb`.
- Short enquiry endpoint: `mgorpzpy`.
- Contact success: `generate_lead`, `lead_type: consultation_form`, `form_location: contact_page`.
- Popup success: `generate_lead`, `lead_type: consultation_form`, `form_location: lead_popup`.
- Phone: `phone_click`, `lead_type: phone`, `link_location: contact_info`.
- WhatsApp: `whatsapp_click`, `lead_type: whatsapp`, existing `floating_button` and `footer` locations.

Production audit compares the original tracking bootstrap against Git HEAD and verifies it is retained. Prerendering blocks external tracking requests and starts from the pristine HTML shell, avoiding duplicated injected runtime scripts. No Google Ads account/container settings were changed. Browser tests use mocked form responses and blocked external requests; no live leads or test advertising conversions were sent.

This verifies website event behavior and retained integration code. It does **not** verify receipt in GA4 or Google Ads, property ownership, GTM tag configuration, attribution, consent settings or Ads conversion-action mapping. Those require account-side validation.

## SEO and build improvements

Each prerendered route has one title, description, canonical and H1. Structured data uses supported service areas without fabricated review markup. Real existing imagery supplies social previews. Managed fallback metadata prevents duplicate route tags. Prerendering captures route titles explicitly, preserves visible no-JavaScript content and fails clearly if its required Chromium is unavailable.

## Validation completed

| Check | Result |
| --- | --- |
| TypeScript app and Node configurations | Passed |
| ESLint | Zero errors; seven existing shadcn React Refresh warnings remain |
| Vitest | Five tests passed, including analytics queue and click payload tests |
| Production build | Passed; all 14 public content routes prerendered |
| Browser route checks | 28 route/viewport combinations at 1440 and 390 px; no horizontal overflow, broken images, invalid internal links or duplicate canonical tags |
| Interaction checks | Mobile navigation/Escape, route scroll, service and city preselection, lighting selector, invalid/failed/successful forms, repeated successful enquiries and exact phone/WhatsApp payloads passed |
| Production audit | 14 static pages with unique SEO and original tracking bootstrap; 12 additional checks at 320, 768 and 1024 px; no-JavaScript content passed |
| Visual review | All 14 content routes plus not-found captured and reviewed on desktop and mobile |

Repeat with `npm test`, `npm run lint`, `npx tsc --noEmit -p tsconfig.app.json`, `npx tsc --noEmit -p tsconfig.node.json`, `npm run build`, `npm run test:e2e` and `npm run test:production`. Browser scripts expect the local dev/preview servers and installed Chromium used in this environment; adjust origin/executable for another machine.

Local preview: http://127.0.0.1:5173/ . Production preview: http://127.0.0.1:4173/ . Screenshot gallery: `artifacts/redesign/preview-index.html`. JSON evidence: `artifacts/redesign/qa-results.json` and `artifacts/redesign/production-audit.json`. Generated artifacts are ignored by Git.

## Business verification still needed

1. Confirm rights/provenance for existing imagery. Supply approved completed-project photos, attribution, scope and client consent before publishing portfolio claims.
2. Supply verified company/team history, credentials, insurance, warranties and testimonials if these are to be published. None were invented.
3. Confirm operational service scope, availability in the eight listed cities, consultation arrangements, budgeting choices and responsibilities described in planning copy.
4. Confirm actual Formspree inbox delivery, backend validation and handling. Local success/failure tests were mocked.
5. Use GTM Preview, GA4 DebugView and Google Ads diagnostics to confirm the intended property and conversion destinations, deduplication and attribution before paid campaigns rely on them.
6. Provide approved privacy/terms content and any required consent implementation. No business legal policy was invented.

No deployment, account changes or real form submissions were performed.
