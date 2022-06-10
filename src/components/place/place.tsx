import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import Header from '../header/header';
import ReviewForm from '../review-form/review-form';
import Reviews from '../reviews/reviews';
import Loader from '../loader/loader';
import Map from '../map/map';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offers';
import { State } from '../../types/state';
import { convertRating } from '../../services/utils';
import { AppRoute, ApiRoute } from '../../consts';
import { createApi } from '../../services/api';


const mapStateToProps = ({ defaultOffers, isDataLoaded }: State) => ({
  offers: defaultOffers,
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type PlaceProps = {
  offers: Offer[];
  isDataLoaded: boolean;
}

function Place({ offers, isDataLoaded }: PlaceProps): JSX.Element {
  const urlId = useParams();
  const api = createApi();
  const [reviews, setReviews] = useState([]);
  const [nearbyOffers, setNearbyOffers] = useState<Offer[] | null>(null);
  const [activeCard, setActivecard] = useState(0);

  const getOffer = (): Offer | false | undefined => {
    if (isDataLoaded) {
      return offers.find((offer) => offer.id === Number(urlId.id));
    }
    return false;
  };

  const handleHoveredCard = (id: number): void => {
    setActivecard(id);
  };

  useEffect(() => {
    api.get(`${ApiRoute.Comments}/${urlId.id}`)
      .then(({ data }) => setReviews(data))
      .catch((e) => console.log(e));

    api.get(`${ApiRoute.Offers}/${urlId.id}/nearby`)
      .then(({ data }) => setNearbyOffers(data))
      .catch((e) => console.log(e));
  }, [urlId.id]);

  const placeData = getOffer();

  if (placeData === undefined) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className="page">
      <Header />
      {
        !placeData ?
          <Loader /> :
          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {placeData.images.slice(0, 6).map((image) => (
                    <div className="property__image-wrapper" key={image}>
                      <img className="property__image" src={image} alt="Photo studio" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {placeData.isPremium &&
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>}
                  <div className="property__name-wrapper">
                    <h1 className="property__name">{placeData.title}</h1>
                    <button className={`property__bookmark-button button ${placeData.isFavorite ? 'property__bookmark-button--active' : ''}`} type="button">
                      <svg className="property__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{
                        width: convertRating(placeData.rating),
                      }}
                      >
                      </span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{placeData.rating}</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">{placeData.type}</li>
                    <li className="property__feature property__feature--bedrooms">{placeData.bedrooms}</li>
                    <li className="property__feature property__feature--adults">{placeData.maxAdults}</li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">€{placeData.price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {placeData.goods.map((good) => (
                        <li className="property__inside-item" key={good}>{good}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                        <img className="property__avatar user__avatar" src={placeData.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                      </div>
                      <span className="property__user-name">
                        Angelina
                      </span>
                      {placeData.host.isPro &&
                        <span className="property__user-status">
                          Pro
                        </span>}
                    </div>
                    <div className="property__description">
                      <p className="property__text">{placeData.description}</p>
                    </div>
                  </div>
                  <div className="property__wrapper">
                    <section className="property__reviews reviews">
                      <Reviews reviews={reviews} />
                      <ReviewForm />
                    </section>
                  </div>
                </div>
              </div>
              <section className="property__map map">
                {nearbyOffers && <Map offers={nearbyOffers} activeCard={activeCard} />}
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  {nearbyOffers && nearbyOffers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} handleCardHover={handleHoveredCard}
                      className={'near-places__card'}
                    />))}
                </div>
              </section>
            </div>
          </main>
      }

    </div>
  );
}

export { Place };
export default connector(Place);

