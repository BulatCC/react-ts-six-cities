import {Offer} from '../types/offers';

export enum ActionType {
  ChangeSelectedCity = 'ChangeSelectedCity',
  LoadOffers = 'LoadOffers',
}

export const сhangeSelectedCity = (city: string) => ({
  type: ActionType.ChangeSelectedCity,
  payload: city,
} as const);

export const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export type Actions =
  | ReturnType<typeof сhangeSelectedCity>
  | ReturnType<typeof loadOffers>
