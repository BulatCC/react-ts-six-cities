import { Offer } from './offers';

export type State = {
  selectedCity: string,
  defaultOffers: Offer[],
  isDataLoaded: boolean,
  currentSortType: string,
};
