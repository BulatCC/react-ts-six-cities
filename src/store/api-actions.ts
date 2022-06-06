import {ThunkActionResult} from '../types/actions';
import {OfferBackend} from '../types/offers';
import {ApiRoute} from '../consts';
import {loadOffers} from './actions';
import {adaptToClient} from '../services/adapter';

export const fetchOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferBackend[]>(ApiRoute.offers);
    const offers = data.map((offer) => adaptToClient(offer));
    dispatch(loadOffers(offers));
  };
