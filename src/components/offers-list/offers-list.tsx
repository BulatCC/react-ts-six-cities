import {useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offers';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({offers}: OffersListProps): JSX.Element {
  const [activeCard, setActivecard] = useState(0);

  const hadleCardHover = (id: number):void => {
    setActivecard(id);
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} hadleCardHover={hadleCardHover} />)}
    </div>
  )
}

export default OffersList;
