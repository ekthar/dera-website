type ClassValue = string | false | null | undefined;

/** Joins class names and drops falsy values. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

export function absoluteUrl(path: string, base: string): string {
  return new URL(path, base).toString();
}
