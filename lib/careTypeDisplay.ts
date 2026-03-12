// Care type → emoji and soft badge color for facility cards
const CARE_TYPE_MAP: Record<string, { emoji: string; badgeClass: string }> = {
  preschool: { emoji: "🎨", badgeClass: "bg-amber-100 text-amber-800" },
  "day care center": { emoji: "🏫", badgeClass: "bg-sky-100 text-sky-800" },
  "after school program": { emoji: "📚", badgeClass: "bg-violet-100 text-violet-800" },
  "nursery school": { emoji: "🌱", badgeClass: "bg-emerald-100 text-emerald-800" },
  "child care agency": { emoji: "👶", badgeClass: "bg-rose-100 text-rose-800" },
  kindergarten: { emoji: "🎓", badgeClass: "bg-indigo-100 text-indigo-800" },
};

export function getCareTypeDisplay(careType: string): { emoji: string; label: string; badgeClass: string } {
  const normalized = (careType || "").toLowerCase().trim();
  const found = CARE_TYPE_MAP[normalized];
  if (found) {
    return { ...found, label: careType || "Other" };
  }
  return {
    emoji: "🏠",
    label: careType || "Other",
    badgeClass: "bg-slate-100 text-slate-700",
  };
}
