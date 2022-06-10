import { useState } from 'react';
import { connect } from 'react-redux';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import Sort from '../sort/sort';
import { Offer } from '../../types/offers';
import { State } from '../../types/state';
import {sortOffers} from '../../services/utils';
import {SortType} from '../../consts';

type MainOffersProps = {
  offersInCity: Offer[];
  selectedCity: string;
  currentSortType: string;
}

const mapStateToProps = ({ currentSortType }: State) => ({
  currentSortType,
});

const connector = connect(mapStateToProps);

function MainOffers({ offersInCity, selectedCity, currentSortType }: MainOffersProps): JSX.Element {
  const [activeCard, setActivecard] = useState(0);
  const handleHoveredCard = (id: number): void => {
    setActivecard(id);
  };

  const sortedOffers:Offer[] = currentSortType === SortType.Popular ? offersInCity : sortOffers[currentSortType](offersInCity);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersInCity.length} places to stay in {selectedCity}</b>
        <Sort />
        <OffersList offers={sortedOffers} handleHoveredCard={handleHoveredCard} />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map offers={offersInCity} activeCard={activeCard} />
        </section>
      </div>
    </div>
  );
}

export { MainOffers };
export default connector(MainOffers);
