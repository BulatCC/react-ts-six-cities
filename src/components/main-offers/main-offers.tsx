import {useState} from 'react';
import OffersList from '../offers-list/offers-list';
import MainMap from '../main-map/main-map';
import { Offer } from '../../types/offers';

type MainOffersProps = {
  offersInCity: Offer[];
  selectedCity: string;
}

function MainOffers({ offersInCity, selectedCity }: MainOffersProps): JSX.Element {
  console.log(offersInCity)
  const [activeCard, setActivecard] = useState(0);
  const handleHoveredCard = (id: number):void => {
    setActivecard(id);
  }

  return (
    <div className="cities__places-container container">
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersInCity.length} places to stay in {selectedCity}</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0} >
          Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>Popular</li>
          <li className="places__option" tabIndex={0}>Price: low to high</li>
          <li className="places__option" tabIndex={0}>Price: high to low</li>
          <li className="places__option" tabIndex={0}>Top rated first</li>
        </ul>
      </form>
      <OffersList offers={offersInCity} handleHoveredCard={handleHoveredCard}/>
    </section>
    <div className="cities__right-section">
      <MainMap offers={offersInCity} activeCard={activeCard}/>
    </div>
  </div>
  );
}

export default MainOffers;
