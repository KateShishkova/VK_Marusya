type TRatingClass = 'low' | 'medium' | 'good' | 'high';

export const getRatingClass = (rating: number): TRatingClass => {
  if (rating >= 8) return 'high';
  if (rating >= 7) return 'good';
  if (rating >= 5) return 'medium';
  return 'low';
}