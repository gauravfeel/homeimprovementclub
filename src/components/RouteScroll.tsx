import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function RouteScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
    else
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
  }, [pathname, hash]);
  return null;
}
