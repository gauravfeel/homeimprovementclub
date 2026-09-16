import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../../sanity/schemaTypes";

export const studioConfig = defineConfig({
  name: "hic-blog",
  title: "Home Improvement Club Blog",
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  basePath: "/admin/blog",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
