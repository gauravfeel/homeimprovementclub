import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const GHL_URL = "https://services.leadconnectorhq.com/hooks/test-ghl";
const SHEET_URL = "https://script.google.com/macros/s/test-sheet/exec";

const contactBody = {
  source: "contact_page",
  firstName: "Alex",
  lastName: "Chen",
  email: "alex@example.com",
  phone: "(604) 555-0142",
  propertyAddress: "123 Main Street",
  city: "Vancouver",
  bestContactTime: "Morning",
  projectType: "Kitchen",
  budget: "25000",
  message: "Open the kitchen wall.",
  company: "",
};

function createReq(body: Record<string, unknown>, ip: string) {
  const listeners: Record<string, ((chunk?: Buffer) => void)[]> = {};
  const req = {
    method: "POST",
    headers: {},
    socket: { remoteAddress: ip },
    on(event: string, fn: (chunk?: Buffer) => void) {
      (listeners[event] ||= []).push(fn);
      return req;
    },
  };
  queueMicrotask(() => {
    const payload = Buffer.from(JSON.stringify(body));
    for (const fn of listeners.data || []) fn(payload);
    for (const fn of listeners.end || []) fn();
  });
  return req;
}

function createRes() {
  const res = {
    statusCode: 0,
    body: "",
    writeHead(status: number) {
      res.statusCode = status;
    },
    end(payload: string) {
      res.body = payload;
    },
  };
  return res;
}

describe("POST /api/lead GoHighLevel", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let handleLead: (req: unknown, res: unknown) => Promise<void>;
  let resetLeadRateLimit: () => void;
  let ip = 1;

  beforeEach(async () => {
    vi.resetModules();
    process.env.VITEST = "true";
    process.env.NODE_ENV = "test";
    process.env.GHL_LEAD_WEBHOOK_URL = GHL_URL;
    process.env.GOOGLE_SHEETS_WEBHOOK_URL = SHEET_URL;
    process.env.GOOGLE_SHEETS_WEBHOOK_SECRET = "sheet-secret";
    delete process.env.RESEND_API_KEY;
    fetchMock = vi.fn(async (url: string) => {
      if (String(url).includes("leadconnectorhq") || String(url) === GHL_URL) {
        return { ok: true, status: 200 };
      }
      if (String(url) === SHEET_URL) {
        return { ok: true, status: 200 };
      }
      return { ok: true, status: 200 };
    });
    vi.stubGlobal("fetch", fetchMock);
    ({ handleLead, resetLeadRateLimit } = await import("../../server/index.mjs"));
    resetLeadRateLimit();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("posts the GHL payload then the sheet", async () => {
    const res = createRes();
    await handleLead(createReq(contactBody, `203.0.113.${ip++}`), res);
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual({ ok: true });

    const urls = fetchMock.mock.calls.map((call) => String(call[0]));
    expect(urls[0]).toBe(GHL_URL);
    expect(urls.some((url) => url.includes("api.resend.com"))).toBe(false);

    const ghlInit = fetchMock.mock.calls[0][1] as RequestInit;
    const payload = JSON.parse(String(ghlInit.body));
    expect(payload).toMatchObject({
      firstName: "Alex",
      lastName: "Chen",
      email: "alex@example.com",
      phone: "(604) 555-0142",
      propertyAddress: "123 Main Street",
      city: "Vancouver",
      bestContactTime: "Morning",
      projectType: "Kitchen",
      budget: "25000",
      message: "Open the kitchen wall.",
      source: "contact_page",
      leadSource: "Website form",
    });
    expect(Number.isNaN(Date.parse(payload.submittedAt))).toBe(false);
  });

  it("returns 500 when GHL fails", async () => {
    fetchMock.mockImplementation(async (url: string) => {
      if (String(url) === GHL_URL) return { ok: false, status: 502 };
      return { ok: true, status: 200 };
    });
    const res = createRes();
    await handleLead(createReq(contactBody, `203.0.113.${ip++}`), res);
    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res.body)).toEqual({
      ok: false,
      error: "Could not save lead",
    });
    const urls = fetchMock.mock.calls.map((call) => String(call[0]));
    expect(urls).not.toContain(SHEET_URL);
    expect(urls.some((url) => url.includes("api.resend.com"))).toBe(false);
  });

  it("succeeds when GHL works and the sheet fails", async () => {
    fetchMock.mockImplementation(async (url: string) => {
      if (String(url) === GHL_URL) return { ok: true, status: 200 };
      if (String(url) === SHEET_URL) return { ok: false, status: 500 };
      return { ok: true, status: 200 };
    });
    const res = createRes();
    await handleLead(createReq(contactBody, `203.0.113.${ip++}`), res);
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual({ ok: true });
    expect(fetchMock.mock.calls.some((call) => String(call[0]) === SHEET_URL)).toBe(true);
    expect(
      fetchMock.mock.calls.some((call) => String(call[0]).includes("api.resend.com")),
    ).toBe(false);
  });
});
