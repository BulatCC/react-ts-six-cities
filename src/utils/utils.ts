export const convertRating = (rate: number): string => {
  const MAX_RATING = 5;
  return `${Math.round(rate) * (100 / MAX_RATING)}%`;
};
