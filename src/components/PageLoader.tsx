/** Shown while lazy route chunks load — keep DOM minimal for fast first paint. */
const PageLoader = () => (
  <div className="page-loader" role="status" aria-live="polite" aria-label="Loading page">
    <p className="page-loader-mark">Home Improvement Club</p>
    <span className="page-loader-rule" aria-hidden>
      <span className="page-loader-sweep" />
    </span>
    <p className="page-loader-copy">Preparing the page</p>
  </div>
);

export default PageLoader;
