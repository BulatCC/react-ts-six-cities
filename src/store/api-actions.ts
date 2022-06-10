import {ThunkActionResult} from '../types/actions';
import {Offer} from '../types/offers';
import {ApiRoute} from '../consts';
import {loadOffers} from './actions';

export const fetchOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(ApiRoute.Offers);
    dispatch(loadOffers(data));
  };
