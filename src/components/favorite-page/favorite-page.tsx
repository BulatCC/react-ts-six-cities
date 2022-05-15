import Header from '../header/header';
import Favorites from '../favorites/favorites';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import { Offer } from '../../types/offers';

type FavoritePageProps = {
  offers: Offer[];
}

function FavoritePage({ offers }: FavoritePageProps): JSX.Element {
  const favoriteData = offers.filter(offer => offer.isFavorite);

  return (
    <div className={`page ${favoriteData.length ? '' : 'page--favorites-empty'}`}>
      <Header />
      {favoriteData.length ? <Favorites favoriteData={favoriteData}/> : <FavoritesEmpty/>}
    </div>
  );
}

export default FavoritePage;
