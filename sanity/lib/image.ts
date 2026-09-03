import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a CDN URL for a Sanity image.
 *
 * Always chain `.width()` (and `.height()` where the design fixes both) so the
 * CDN resizes rather than shipping the original — several of the source files
 * are multi-megabyte.
 */
export function urlFor(source: Image) {
  return builder.image(source).auto("format").fit("max");
}

/** Intrinsic dimensions, parsed out of the asset id Sanity encodes them into. */
export function dimensions(source: Image): { width: number; height: number } | null {
  const ref = (source?.asset as { _ref?: string } | undefined)?._ref;
  if (!ref) return null;
  // image-<id>-<width>x<height>-<ext>
  const match = /-(\d+)x(\d+)-[a-z]+$/.exec(ref);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}
