"use client";

/**
 * Sanity Studio, mounted inside this app at /studio.
 *
 * Keeping the Studio in-repo means content types live next to the components
 * that render them, and a schema change ships in the same pull request as the
 * component change that needs it.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool(),
    // Vision runs GROQ queries against the dataset from inside the Studio.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
