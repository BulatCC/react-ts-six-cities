
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import Header from '../header/header';
import MainOffers from '../main-offers/main-offers';
import MainEmpty from '../main-empty/main-empty';
import LocationsList from '../locations-list/locations-list';
import { Offer } from '../../types/offers';
import { State } from '../../types/state';

type MainProps = {
  offers: Offer[];
  selectedCity: string;
}

const mapStateToProps = ({ defaultOffers, selectedCity }: State) => ({
  offers: defaultOffers,
  selectedCity
});

const connector = connect(mapStateToProps);
function Main({ offers, selectedCity }: MainProps): JSX.Element {
  const offersInCity = offers.filter(offer => offer.city.name === selectedCity);

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
        <div className="cities">
          {offersInCity.length ?
            <MainOffers offersInCity={offersInCity} selectedCity={selectedCity} /> :
            <MainEmpty />}
        </div>
      </main>
    </div>
  );
}

export { Main };
export default connector(Main);
