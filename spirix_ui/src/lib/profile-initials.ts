/** Two-letter initials for profile avatar from login / display label. */
export function profileInitialsFromLabel(label: string): string {
  const t = label.trim();
  if (!t) return "?";
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase().slice(0, 2);
  }
  return t.slice(0, 2).toUpperCase();
}
