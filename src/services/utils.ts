import { SortType } from '../consts';
import { Offer } from '../types/offers';

export const convertRating = (rate: number): string => {
  const MAX_RATING = 5;
  return `${Math.round(rate) * (100 / MAX_RATING)}%`;
};

export const getDate = (date: Date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fullDate = new Date(date);
  const year = fullDate.getFullYear();
  const month = months.find((m, i) => i === fullDate.getMonth());
  return `${month} ${year}`;
};

export const sortOffers = {
  [SortType.Popular]: (offers: Offer[]): Offer[] => offers,
  [SortType.PriceHighToLow]: (offers: Offer[]): Offer[] => offers.slice().sort((a, b) => b.price - a.price),
  [SortType.PriceLowToHigh]: (offers: Offer[]): Offer[] => offers.slice().sort((a, b) => a.price - b.price),
  [SortType.TopRated]: (offers: Offer[]): Offer[] => offers.slice().sort((a, b) => b.rating - a.rating),
};
