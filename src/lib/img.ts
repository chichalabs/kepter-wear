/**
 * Prefixes static asset paths with the base path. Needed because unoptimized
 * next/image (static export for GitHub Pages) does not apply basePath itself.
 */
export function withBase(src: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
