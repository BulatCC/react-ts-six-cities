import { convertRating, getDate } from '../../services/utils';
import { Review } from '../../types/reviews';


type ReviewsProps = {
  reviews: Review[]
}

function Reviews({ reviews }: ReviewsProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map(({ id, comment, rating, date, user: {avatarUrl, name} }) => (
          <li className="reviews__item" key={id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">{name}</span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{
                    width: convertRating(rating),
                  }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">{comment}</p>
              <time className="reviews__time" dateTime="2019-04-24">{getDate(date)}</time>
            </div>
          </li>
        ),
        )}

      </ul>
    </>
  );
}

export default Reviews;
