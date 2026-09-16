import { Component, type ReactNode } from "react";
import { Studio } from "sanity";
import { studioConfig } from "@/lib/sanity-studio-config";

class StudioErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <pre style={{ padding: "2rem", whiteSpace: "pre-wrap" }}>
          {this.state.error.message}
        </pre>
      );
    }
    return this.props.children;
  }
}

export default function BlogAdmin() {
  if (!import.meta.env.VITE_SANITY_PROJECT_ID?.trim()) {
    return (
      <p style={{ padding: "2rem", fontFamily: "serif" }}>
        Set VITE_SANITY_PROJECT_ID in .env, then restart npm run dev.
      </p>
    );
  }

  return (
    <div style={{ height: "100vh" }}>
      <StudioErrorBoundary>
        <Studio config={studioConfig} />
      </StudioErrorBoundary>
    </div>
  );
}
