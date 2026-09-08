# Home Improvement Club — Google Ads Pre-Launch

Date: September 8, 2026  
Required state: PAUSED — no spend today

## Executive summary

Do not launch yet. Account, website, and GSC are accessible, but conversion measurement is not launch-ready. Existing Analytics tab points to MAG Roofing, not HIC. Website loads GTM-KZJKRK4F plus four Google Ads destinations, while Google Ads reports zero conversion actions currently recording. Existing campaigns remain paused.

## Account inventory

- Google Ads account: Home Improvement Club; customer/OCID 817-723-4099.
- GSC property: sc-domain:homeimprovementclub.co.
- GTM container on live site: GTM-KZJKRK4F.
- Open GA4 property: MAG Roofing, property 549056540 under account 402471802. This is not HIC.
- Website Google Ads destinations observed: AW-7592483743, AW-7592144123, AW-7592546850, AW-18102151992. Ownership/purpose must be reconciled.
- Billing exists. Primary Visa ending 3022. No billing change made.

## Existing-account audit

All-time range available: April 18–September 8, 2026.

- Spend: CA$1,223.06
- Impressions: 16,014
- Clicks: 336
- CTR: 2.10%
- Reported conversions: 3
- Reported conversion rate: 0.89%
- Reported cost/conversion: CA$407.69

Campaigns:

- `SearchAds/Call/Form/23/04`: CA$171.20 spend; 11,279 impressions; 199 clicks; 1.76% CTR; 0 conversions.
- `Leads-Search/call | 8 May'26`: CA$1,051.86 spend; 4,732 impressions; 137 clicks; 2.90% CTR; 3 conversions; CA$350.62 campaign CPL. Lead-form asset disapproved.
- `HIC — Chilliwack — Call Intent`: CA$7.84/day; 3 impressions; 0 clicks; 0 spend; missing lead-form asset.

Structural problems:

- 303 active/paused search keywords, dominated by broad match.
- Keyword-view spend: CA$1,001.74 on 94 clicks; 3 conversions; CA$333.91 CPL.
- Query leakage includes `need help fixing my house`, competitor `aura interiors abbotsford`, product intent `kohler shower systems`, repair intent, tile-only intent, and cost-research intent.
- Campaign-specific goals include form leads, phone-call leads, outbound clicks, and page views. Page views/outbound clicks must not guide lead bidding.
- Chilliwack campaign uses Target CPA CA$5 despite no reliable campaign conversion history. Unrealistic target.
- Account diagnostics: one tag inactive, one unverified, five with no recent conversions, zero recording.

Useful historical signal:

- `bathroom renovation abbotsford` broad-match keyword: CA$120.28 spend, 10 clicks, 2 reported conversions, CA$60.14 each.
- `construction renovation company`: one reported conversion at CA$114.84, but intent is broad and conversion validity is unverified.

## Confirmed services and offer

Live site confirms:

- Kitchen and cabinet renovations
- Full bathroom renovations
- Lighting upgrades
- Tile and flooring replacement
- HVAC and electrical upgrades
- Exterior renovations

Offer: free in-home consultation / free renovation plan. Phone: +1 236-380-4423. WhatsApp available.

Trust signals shown: licensed, insured, vetted contractors; local project examples; named testimonials with city/service labels. Owner should confirm substantiation before ads reuse these claims.

## Geography

Website states Greater Vancouver and Fraser Valley, including Abbotsford, Chilliwack, Hope, Langley, and Metro Vancouver. Launch targeting should use presence-only intent, not presence-or-interest. Owner must confirm exact serviceable municipalities before expanding beyond Chilliwack/Abbotsford/Langley.

## Recommended launch architecture

Start narrow. Do not reactivate old broad-match campaigns.

1. Search — Bathroom Renovations — Fraser Valley
2. Search — Kitchen Renovations — Fraser Valley

Initial keywords: exact and phrase only. Examples:

- [bathroom renovation abbotsford]
- [bathroom renovation chilliwack]
- "bathroom renovation contractor"
- "bathroom remodeling company"
- [kitchen renovation abbotsford]
- [kitchen renovation chilliwack]
- "kitchen renovation contractor"
- "kitchen remodeling company"

Use service pages:

- https://homeimprovementclub.co/services/bathrooms
- https://homeimprovementclub.co/services/kitchen-cabinets

Do not launch lighting, flooring, HVAC/electrical, exterior, basement, suite, or whole-home campaigns until service capacity, margins, and landing-page fit are confirmed.

## Negative-keyword foundation

Shared negatives:

`diy`, `how to`, `tutorial`, `course`, `training`, `school`, `jobs`, `job`, `career`, `careers`, `salary`, `employment`, `apprentice`, `wholesale`, `supplier`, `supplies`, `materials`, `home depot`, `lowes`, `rona`, `ikea`, `plans`, `template`, `free plans`, `calculator`, `software`, `images`, `ideas`, `inspiration`, `before and after`, `repair`, `handyman`, `parts`, `kohler`, `showroom`, `used`, `cheap`, `reddit`.

Add competitor names only after owner decides whether competitor conquesting is desired. Use cross-campaign negatives so kitchen and bathroom campaigns do not compete.

## Competitor/SERP findings

- Vancouver Renovate: fixed-price, showroom, licensed/WorkSafeBC, free in-home design.
- Renew Co: one accountable team, no subcontracting chains, no-surprise positioning.
- BOCA Renovations: free on-site estimate, licensed/insured, response-time promise, city coverage.
- Elevare Renovations: owner-operated, local Fraser Valley positioning, transparent pricing.
- ASC Services: detail/craftsmanship and Chilliwack-local positioning.

Opportunity: combine local Fraser Valley relevance, project-managed simplicity, vetted specialists, and free on-site consultation. Do not claim fixed pricing, years in business, ratings, warranty, or project counts without proof.

## Landing-page audit

Strengths: service-specific pages, visible phone/WhatsApp, free consultation, local coverage, project imagery, process, testimonial section, mobile-friendly structure.

Gaps:

- Tracking architecture is fragmented.
- Current contact taxonomy says `Kitchen & Bath`, preventing service-level attribution.
- Several claims need owner evidence: licensed/insured/vetted, testimonial authenticity, portfolio provenance, response within 24 hours.
- No dedicated thank-you URL; conversion must fire only after confirmed Formspree success.

Code change completed locally: added `dataLayer` events for successful contact form (`generate_lead`), successful popup form (`generate_lead`), phone clicks (`phone_click`), and WhatsApp clicks (`whatsapp_click`). TypeScript check passes. These changes are not deployed by this audit.

## Conversion architecture required before launch

Primary:

- `generate_lead` — confirmed successful Formspree submission only.
- Qualified call — Google forwarding/call conversion with meaningful duration threshold (recommend 60 seconds; owner confirm).

Secondary:

- `phone_click`
- `whatsapp_click`
- form_start

Diagnostic only, never Primary:

- page_view
- outbound_click
- scroll

Required work:

1. Create/find correct HIC GA4 property.
2. Reconcile four AW destinations and remove unrelated duplicate destinations from HIC GTM.
3. Configure GA4 tag and Conversion Linker in GTM-KZJKRK4F.
4. Map dataLayer events to GA4.
5. Import only qualified lead events into Ads; mark Primary once tested.
6. Test form, phone, and WhatsApp end-to-end in GTM Preview and GA4 DebugView.
7. Remove page views/outbound clicks from campaign bidding goals.

## Budget and bidding

Do not use Target CPA CA$5. Conversion data is too sparse and unreliable.

Recommended controlled test: CA$30–50/day total, split 50/50 bathroom and kitchen after tracking works. Start Maximize Clicks with a CPC cap or Manual CPC where available; move to Maximize Conversions only after clean lead volume. Owner must approve exact budget before activation.

## Tomorrow launch gate

- Confirm correct Ads account 817-723-4099.
- Confirm HIC GA4 property and GTM container.
- Confirm test form lead appears once in GA4 and Ads.
- Confirm call conversion and number.
- Confirm page views/outbound clicks are not Primary.
- Confirm exact cities and presence-only targeting.
- Confirm Search Network only; intentionally decide Search Partners; Display expansion off.
- Confirm exact/phrase keywords and negative list.
- Confirm live landing URLs and mobile form.
- Confirm ads contain only substantiated claims.
- Confirm daily budget with owner.
- Enable only approved new/narrow campaigns.

## Monitoring

- First 24 hours: delivery, spend pacing, URLs, conversions, calls, search terms.
- First 3 days: exclude irrelevant queries; check geography and CPC.
- First 7 days: review spend, leads, qualified leads, consultations, CPL.
- Ongoing: optimize toward won projects and revenue, not clicks/CTR alone.

## Current state

All three Google Ads campaigns remain paused. No ad spend activated today. Launch blocked by missing HIC GA4 property, fragmented Ads tags, unverified conversion actions, lead-form asset issues, and owner budget/geography confirmation.

Research references:

- https://homeimprovementclub.co/
- https://vancouverrenovate.ca/kitchen-renovation-vancouver/
- https://renewco.ca/
- https://www.bocarenovations.ca/
- https://elevarerenovationsltd.ca/
- https://ascbuild.com/services/bathroom/
