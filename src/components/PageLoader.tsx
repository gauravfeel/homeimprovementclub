/** Shown while lazy route chunks load — keep DOM minimal for fast first paint. */
const PageLoader = () => (
  <div
    className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-6"
    role="status"
    aria-live="polite"
    aria-label="Loading page"
  >
    <div
      className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin"
      aria-hidden
    />
    <p className="text-sm text-muted-foreground">Loading…</p>
  </div>
);

export default PageLoader;
