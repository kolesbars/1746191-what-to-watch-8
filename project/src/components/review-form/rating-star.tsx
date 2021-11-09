import {memo} from 'react';

type RatingStarsProps = {
  number: number
}

function RatingStar(props: RatingStarsProps): JSX.Element {
  const {number} = props;
  return (
    <>
      <input className="rating__input" id={`star-${number}`} type="radio" name="rating" value={number} />
      <label className="rating__label" htmlFor={`star-${number}`}>Rating {number}</label>
    </>
  );
}

export default memo(RatingStar);
