// Care type → emoji, soft badge class, and solid hex (for premium-style cards)
const CARE_TYPE_MAP: Record<string, { emoji: string; badgeClass: string; hex: string }> = {
  preschool: { emoji: "🎨", badgeClass: "bg-amber-100 text-amber-800", hex: "#d97706" },
  "day care center": { emoji: "🏫", badgeClass: "bg-sky-100 text-sky-800", hex: "#0284c7" },
  "after school program": { emoji: "📚", badgeClass: "bg-violet-100 text-violet-800", hex: "#7c3aed" },
  "nursery school": { emoji: "🌱", badgeClass: "bg-emerald-100 text-emerald-800", hex: "#059669" },
  "child care agency": { emoji: "👶", badgeClass: "bg-rose-100 text-rose-800", hex: "#e11d48" },
  kindergarten: { emoji: "🎓", badgeClass: "bg-indigo-100 text-indigo-800", hex: "#4f46e5" },
};

const DEFAULT_HEX = "#0f766e";

export function getCareTypeDisplay(careType: string): {
  emoji: string;
  label: string;
  badgeClass: string;
  hex: string;
} {
  const normalized = (careType || "").toLowerCase().trim();
  const found = CARE_TYPE_MAP[normalized];
  if (found) {
    return { ...found, label: careType || "Other" };
  }
  return {
    emoji: "🏠",
    label: careType || "Other",
    badgeClass: "bg-slate-100 text-slate-700",
    hex: DEFAULT_HEX,
  };
}
