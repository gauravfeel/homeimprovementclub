type DataLayerEvent = Record<string, string | number | boolean | undefined> & {
  event: string;
};

type Gtag = (
  command: "event",
  eventName: string,
  parameters?: Record<string, string | number | boolean | undefined>,
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function trackEvent(event: DataLayerEvent) {
  const { event: eventName, ...parameters } = event;

  // Send directly to the configured GA4 property. A plain object pushed to
  // dataLayer does nothing unless GTM also has a matching Custom Event tag.
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
    return;
  }

  // Keep events queued when analytics has not finished loading yet.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", eventName, parameters]);
}
