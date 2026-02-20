/**
 * cn: Combines multiple class names into a single string
 * Ignores falsy values like null, undefined, false
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
