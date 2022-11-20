import {memo} from 'react';

type RatingStarsProps = {
  number: number
  isDisabled: boolean
}

function RatingStar(props: RatingStarsProps): JSX.Element {
  const {number, isDisabled} = props;
  return (
    <>
      <input
        disabled={isDisabled}
        className="rating__input"
        id={`star-${number}`}
        type="radio"
        name="rating"
        value={number}
      />
      <label className="rating__label" htmlFor={`star-${number}`}>Rating {number}</label>
    </>
  );
}

export default memo(RatingStar);
