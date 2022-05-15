export type OfferCard = {
  isFavorite: boolean;
  price: number;
  title: string;
  type: string;
  rating: number;
  previewImage: string;
  id: number;
};

export type Offer = OfferCard & {
  city: {
    name: string;
    location: {
      latitude: number,
      longitude: number,
      zoom: number
    }
  },
  images: string[],
  isPremium: boolean,
  bedrooms: number,
  maxAdults: number,
  goods: string[],
  host: {
      id: number,
      name: string,
      isPro: boolean,
      avatarUrl: string
  },
  description: string,
  location: {
      latitude: number,
      longitude: number,
      zoom: number
  },
}

export type SortedData = {
  cityName: string,
  data: Offer[],
};

export type CityOffers = {
  [index: string]: Offer[];
}
