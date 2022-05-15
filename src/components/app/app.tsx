import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {AppRoute} from '../../consts';
import {Offer, OfferCard} from '../../types/offers';
import Main from '../main/main';
import Login from '../login/login';
import NotFound from '../not-found/not-found';
import FavoritePage from '../favorite-page/favorite-page';
import Place from '../place/place';
import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
  offersCount: number;
  offers: Offer[];
}

function App({ offersCount, offers }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main offersCount={offersCount} offers={offers}/>} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Offer} element={<Place />} />
        <Route path={AppRoute.Favorites}
          element={<PrivateRoute privateElement={<FavoritePage offers={offers} />}/>}
        />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
