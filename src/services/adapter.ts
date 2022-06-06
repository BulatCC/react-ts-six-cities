import {OfferBackend, Offer} from '../types/offers';

export const adaptToClient = (data: OfferBackend):Offer => {
  const adaptedOffer = {
    ...data,
    previewImage: data.preview_image,
    isPremium: data.is_premium,
    isFavorite: data.is_favorite,
  };

  delete adaptedOffer.preview_image;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.is_favorite;

  return adaptedOffer;
};
