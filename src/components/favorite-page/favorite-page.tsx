import {connect, ConnectedProps} from 'react-redux';
import Header from '../header/header';
import Favorites from '../favorites/favorites';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import { Offer } from '../../types/offers';
import { State } from '../../types/state';

const mapStateToProps = ({defaultOffers}: State) => ({
  offers: defaultOffers,
});

const connector = connect(mapStateToProps);

type FavoritePageProps = {
  offers: Offer[];
}

function FavoritePage({ offers }: FavoritePageProps): JSX.Element {
  const favoriteData = offers.filter((offer) => offer.isFavorite);

  return (
    <div className={`page ${favoriteData.length ? '' : 'page--favorites-empty'}`}>
      <Header />
      {favoriteData.length ? <Favorites favoriteData={favoriteData}/> : <FavoritesEmpty/>}
    </div>
  );
}

export {FavoritePage};
export default connector(FavoritePage);
