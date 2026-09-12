export const hicEmailColors = {
  ivory: "#f4f1e9",
  ivoryBright: "#f6f3ed",
  forest: "#314d3e",
  forestDark: "#203c2d",
  onForest: "#faf8f1",
  sage: "#53654e",
  sageMuted: "#5c6758",
  ink: "#263d30",
  inkMuted: "#545b52",
  line: "#c4cabc",
  stone: "#e8e5dc",
};

export const hicEmailTailwind = {
  theme: {
    extend: {
      colors: {
        ivory: hicEmailColors.ivory,
        "ivory-bright": hicEmailColors.ivoryBright,
        forest: hicEmailColors.forest,
        "forest-dark": hicEmailColors.forestDark,
        "on-forest": hicEmailColors.onForest,
        sage: hicEmailColors.sage,
        "sage-muted": hicEmailColors.sageMuted,
        ink: hicEmailColors.ink,
        "ink-muted": hicEmailColors.inkMuted,
        line: hicEmailColors.line,
        stone: hicEmailColors.stone,
      },
      fontFamily: {
        serif: ["'Source Serif 4'", "Georgia", "Times New Roman", "serif"],
        sans: ["'Source Sans 3'", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
};

export function siteUrl() {
  return (process.env.SITE_URL || "https://homeimprovementclub.co").replace(/\/$/, "");
}

export function logoUrl() {
  return `${siteUrl()}/hic-logo.png`;
}
