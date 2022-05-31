import {ActionType, Actions} from './actions';
import {State} from '../types/state';
import { offers } from '../mocks/offers';
import { CityNames } from '../consts';

const initialState = {
  selectedCity: CityNames.PARIS,
  defaultOffers: offers,
};


const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeSelectedCity:
      return {...state, selectedCity: action.payload}
    case ActionType.GetAllOffers:
      return {...state, defaultOffers: action.payload}
    default:
      return state;
  }
};

export { reducer };

