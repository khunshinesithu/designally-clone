/**
 * Sanity connection settings.
 *
 * Project id and dataset are public — they appear in the browser bundle and in
 * every CDN request, which is normal for Sanity. Tokens are not: the write
 * token is only ever read by the migration script, server-side.
 *
 * These deliberately do NOT throw when unset. The site falls back to
 * `seed-data.json` when Sanity is not configured (see `lib/content.ts`), so the
 * repository builds and CI passes before anyone has created a project. Only the
 * Studio route genuinely requires them, and it reports that itself.
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

/** True once both public values are present. */
export const isSanityConfigured = Boolean(projectId && dataset);
