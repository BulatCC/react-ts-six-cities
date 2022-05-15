import FavoriteCard from '../favorite-card/favorite-card';
import { Offer, SortedData, CityOffers } from '../../types/offers';

type FavoriteProps = {
  favoriteData: Offer[];
}

function Favorites({favoriteData}: FavoriteProps): JSX.Element {
  const checkKeyValue = (obj: {}, value: string) => {
    let isTrue;
    Object.keys(obj).forEach(key => key === value ? isTrue = true : isTrue = false);
    return isTrue;
  }

  const getSortedData = (favoriteData: Offer[]): SortedData[] => {
    const cityOffers:CityOffers = {};
    const favorites = [];


    favoriteData.forEach(favorite => {
      if (!checkKeyValue(cityOffers, favorite.city.name)) {
        cityOffers[favorite.city.name] = [favorite];
      } else {
        cityOffers[favorite.city.name].push(favorite);
      }
    });

    for (let city in cityOffers) {
      favorites.push({
        cityName: city,
        data: cityOffers[city],
      });
    }

    favorites.sort((a, b) => {
      if (a.cityName.toLowerCase() < b.cityName.toLowerCase()) {
        return -1;
      }
      if (a.cityName.toLowerCase() > b.cityName.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    return favorites;
  }

  const sortedData = getSortedData(favoriteData)

  return (
    <main className="page__main page__main--favorites">
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {sortedData.map(offer => {
            return (
              <li className="favorites__locations-items" key={offer.cityName}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{offer.cityName}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {offer.data.map((offer) => <FavoriteCard key={offer.id} offer={offer} />)}
                </div>
              </li>
            )
          })
          }
        </ul>
      </section>
    </div>
  </main>
  )

}

export default Favorites;
