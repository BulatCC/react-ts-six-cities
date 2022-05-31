import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offers';

type OffersListProps = {
  offers: Offer[];
  handleHoveredCard: (id: number) => void;
}

function OffersList({offers, handleHoveredCard}: OffersListProps): JSX.Element {
  const handleCardHover = (id: number):void => {
    handleHoveredCard(id);
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} handleCardHover={handleCardHover} />)}
    </div>
  )
}

export default OffersList;
