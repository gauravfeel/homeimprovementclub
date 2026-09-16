import customHomeImage from "@/assets/custom-home.jpg";
import heroHomeImage from "@/assets/hero-home.jpg";
import multiplexImage from "@/assets/multiplex-homes.jpg";

const coverByCategory: Record<string, string> = {
  "Permits & Planning": heroHomeImage,
  "Decision Making": customHomeImage,
  "Investment & ROI": multiplexImage,
};

export function blogCoverFor(category: string) {
  return coverByCategory[category] ?? heroHomeImage;
}
