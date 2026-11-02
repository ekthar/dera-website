/**
 * Dera letter system.
 * Built on a 20-unit cap height with a 5-unit stroke. Every stem is split
 * from its bowl or bars by a 2-unit gap, the "split stem" that carries the
 * idea of separate systems joined into one.
 */

/** D: stem + gap + bowl. 20 x 20. */
export const monogramD = {
  stem: "M0 0h5v20H0z",
  bowl: "M7 0h3a10 10 0 0 1 0 20H7v-5h3a5 5 0 0 0 0-10H7z",
} as const;

/** DERA wordmark. viewBox 0 0 86 20. */
export const wordmarkPaths: ReadonlyArray<string> = [
  // D
  "M0 0h5v20H0z",
  "M7 0h3a10 10 0 0 1 0 20H7v-5h3a5 5 0 0 0 0-10H7z",
  // E
  "M24 0h5v20h-5z",
  "M31 0h9v5h-9z",
  "M31 7.5h7.5v5H31z",
  "M31 15h9v5h-9z",
  // R
  "M44 0h5v20h-5z",
  "M51 0h3.5a6.25 6.25 0 0 1 0 12.5H51v-5h3.5a1.25 1.25 0 0 0 0-2.5H51z",
  "M53.6 12.5h5.5l2.8 7.5h-5.5z",
  // A
  "M66 20 73.5 0h5L86 20h-5.5L76 8l-4.5 12z",
];
