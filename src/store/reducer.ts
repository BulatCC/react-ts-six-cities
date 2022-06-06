import {ActionType, Actions} from './actions';
import {State} from '../types/state';
import { CityNames } from '../consts';

const initialState = {
  selectedCity: CityNames.PARIS,
  defaultOffers: [],
  isDataLoaded: false,
};


const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeSelectedCity:
      return {...state, selectedCity: action.payload};
    case ActionType.LoadOffers:
      return {...state,
        defaultOffers: action.payload,
        isDataLoaded: true,
      };
    default:
      return state;
  }
};

export { reducer };

