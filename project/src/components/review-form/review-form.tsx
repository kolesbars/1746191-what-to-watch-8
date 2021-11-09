import {useState, BaseSyntheticEvent} from 'react';
import RatingStar from './rating-star';
import {memo} from 'react';

function getRatingStars(): JSX.Element[] {
  const stars = [];
  for (let i = 10; i>0; i--) {
    stars.push(<RatingStar number = {i} key={`${i}-star`}/>);
  }
  return stars;
}

function ReviewForm(): JSX.Element {

  const [, setRating] = useState(0);
  const [, setReviewText] = useState('');

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" >
        <div className="rating">
          <div className="rating__stars"
            onClick={({target}: BaseSyntheticEvent) => {
              setRating(Number(target.value));}}
          >
            {getRatingStars()}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
            onInput={({target}: BaseSyntheticEvent) => {
              setReviewText(target.value);}}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default memo(ReviewForm);

