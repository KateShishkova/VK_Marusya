type RatingClass = "low" | "medium" | "good" | "high";

export const getRatingClass = (rating: number): RatingClass => {
  if (rating >= 8) return "high";
  if (rating >= 7) return "good";
  if (rating >= 5) return "medium";
  return "low";
};
