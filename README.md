# Home Improvement Club Website

Marketing website for Home Improvement Club, built with React + TypeScript + Vite.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install

```bash
npm install
```

### Environment Variables

Put secrets in `.env`. Do not commit that file.

Leads POST to `/api/lead`. The Node server sends the lead to GoHighLevel first. GHL saves the contact, alerts the team, and sends the confirmation email. The Google Sheet is a backup only.

1. In GHL, create an inbound webhook workflow. Put the webhook URL in `GHL_LEAD_WEBHOOK_URL`. Map `source` (`contact_page` or `lead_popup`) for tagging.
2. Optional backup sheet: create a Google Sheet. Row 1 headers: Timestamp, Source, First name, Last name, Email, Phone, Property address, City, Best contact time, Project, Budget, Message.
3. Optional: paste `scripts/google-apps-script-leads.js` into Apps Script. Set Script Property `WEBHOOK_SECRET`. Deploy as web app (Execute as Me, Anyone). Put the `/exec` URL in `GOOGLE_SHEETS_WEBHOOK_URL`.
4. DigitalOcean: this is no longer a static-only site. HTTP service, `npm run build`, run `npm start`, expose `$PORT`. Set `GHL_LEAD_WEBHOOK_URL` on the app. Do not set `VITE_` copies of keys.

## Development

Run Vite (port 8080) plus the lead API (port 8787):

```bash
npm run dev
```

Default site: `http://localhost:8080`

## Build and Preview

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Testing and Linting

Run lint checks:

```bash
npm run lint
```

Run tests once:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```
