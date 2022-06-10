import { ActionType, Actions } from './actions';
import { State } from '../types/state';
import { CityNames, SortType } from '../consts';

const initialState = {
  selectedCity: CityNames.Paris,
  defaultOffers: [],
  isDataLoaded: false,
  currentSortType: SortType.Popular,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeSelectedCity:
      return { ...state, selectedCity: action.payload };
    case ActionType.LoadOffers:
      return {
        ...state,
        defaultOffers: action.payload,
        isDataLoaded: true,
      };
    case ActionType.ChangeSortType:
      return {
        ...state,
        currentSortType: action.payload,
      };
    default:
      return state;
  }
};

export { reducer };

