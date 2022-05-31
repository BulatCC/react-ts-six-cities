import {Offer} from '../types/offers';

export enum ActionType {
  ChangeSelectedCity = 'ChangeSelectedCity',
  GetAllOffers = 'GetAllOffers',
}

export const сhangeSelectedCity = (city: string) => ({
  type: ActionType.ChangeSelectedCity,
  payload: city,
} as const);

export const getAllOffers = (offers: Offer[]) => ({
  type: ActionType.GetAllOffers,
  payload: offers,
} as const);

export type Actions =
  | ReturnType<typeof сhangeSelectedCity>
  | ReturnType<typeof getAllOffers>
