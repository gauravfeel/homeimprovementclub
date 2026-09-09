# HIC page architecture audit

Approved visual language stays: warm stone, forest green, editorial serif, restrained rules, rectangular actions and large imagery. This pass replaces repeated page compositions, not the design system.

| Route | Visitor purpose | Current duplication | Purpose-built direction / next action |
| --- | --- | --- | --- |
| `/` | Understand HIC and find the right service | Appropriate overview | Keep overview; link into detailed inner pages |
| `/about` | Understand what HIC is and how to approach it | Homepage process and full service collection | Editorial business introduction, renovation perspective, supported remit, concise invitation; no invented team/history |
| `/services` | Compare work HIC offers | Homepage featured pair and service strip | Six-item visual service directory with scope and context |
| `/how-it-works` | Understand decisions and next steps | Homepage process and general FAQs | Detailed planning sequence with homeowner inputs and a consultation preparation panel |
| `/areas-we-serve` | Check whether HIC covers their location | Homepage area section and service collection | Geographic directory of eight confirmed cities, enquiry requirements, compact service links |
| `/services/kitchen-cabinets` | Plan a kitchen renovation | Generic scope/benefit/process/area template | Kitchen workflow, retain/rework layout, cabinetry and surfaces, service-specific questions, kitchen consultation |
| `/services/bathrooms` | Understand a full bathroom renovation | Kitchen template with changed text | Full-width bathroom imagery, visible finishes/hidden wet-area requirements, household arrangements, bathroom questions |
| `/services/lighting` | Explore layered lighting | Generic service template | Visual lighting story, ambient/task/accent selector, interior/exterior planning, lighting brief |
| `/services/flooring` | Choose a flooring replacement scope | Generic service template | Surface-led image composition, material considerations, room transitions and installation sequence |
| `/services/hvac-electrical` | Plan systems upgrades alongside renovation | Generic service template | Upgrade context, heating/electrical workstreams, coordination checklist, official rebate reference; avoid emergency-service positioning |
| `/services/exterior` | Consider exterior improvements | Interior-style template | Wide exterior image, building-envelope/entrance/outdoor scope, condition-first planning and weather/access questions |
| `/contact` | Enquire with minimum friction | Already action-focused | Preserve form and tracking; concise next steps, direct contact choices, relevant service preselection |
| `/rebates` | Find official funding information | Generic ending | Keep official-resource directory; contextual systems-upgrade navigation and enquiry |
| `/testimonials` | Find homeowner evidence | Generic empty page and full CTA | Honest evidence availability, useful service/process paths; publish no unverified quotes |
| `/contractors` | Legacy membership route | Disabled in existing app | Preserve disabled feature flag and existing route behavior |
| `*` | Recover from an invalid URL | None | Keep branded recovery page and noindex |

Only navigation, footer, typography, image treatment, controls and small content primitives should be shared across inner pages. Full homepage sections stay on the homepage. Existing route URLs, Formspree endpoints, GTM/GA4 bootstrap and conversion-event payloads remain unchanged.

Missing evidence: HIC-approved company narrative, founder/team details, operating responsibilities, project attribution/image rights/client consent, reviews, licences, insurance and warranty terms. No content is invented to fill these gaps.
