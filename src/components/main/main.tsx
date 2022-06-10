import { connect } from 'react-redux';
import Header from '../header/header';
import MainOffers from '../main-offers/main-offers';
import MainEmpty from '../main-empty/main-empty';
import LocationsList from '../locations-list/locations-list';
import Loader from '../loader/loader';
import { Offer } from '../../types/offers';
import { State } from '../../types/state';

type MainProps = {
  offers: Offer[];
  selectedCity: string;
  isDataLoaded: boolean;
}

const mapStateToProps = ({ defaultOffers, selectedCity, isDataLoaded}: State) => ({
  offers: defaultOffers,
  selectedCity,
  isDataLoaded,
});

const connector = connect(mapStateToProps);
function Main({ offers, selectedCity, isDataLoaded}: MainProps): JSX.Element {
  const offersInCity = offers.filter((offer) => offer.city.name === selectedCity);

  return (
    <div className={`page page--gray page--main ${offersInCity.length === 0 ? 'page__main--index-empty' : ''} `}>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList />
          </section>
        </div>
        {isDataLoaded ?
          <div className="cities">
            {offersInCity.length ?
              <MainOffers offersInCity={offersInCity} selectedCity={selectedCity} /> :
              <MainEmpty />}
          </div>
          : <Loader />}
      </main>
    </div>
  );
}

export { Main };
export default connector(Main);
