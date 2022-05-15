import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers} from './mocks/offers';

const Setting = {
  OFFERS_COUNT: 124,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App
      offersCount={Setting.OFFERS_COUNT}
      offers={offers}
    />
  </React.StrictMode>);
