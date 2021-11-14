import {useState, BaseSyntheticEvent} from 'react';
import RatingStar from './rating-star';
import {memo} from 'react';
import {AxiosInstance} from 'axios';
import {GetCommentType} from '../../types/comment-type';
import {APIRoute} from '../../const';
import {updateComments} from '../../store/action';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentFIlmId} from '../../store/selectors';
import {toast} from 'react-toastify';

type ReviewFormProps = {
  api: AxiosInstance
}

const ERROR_MESSAGE = 'Комментарий не отправлен';

function getRatingStars(isDisabled: boolean): JSX.Element[] {
  const stars = [];
  for (let i = 10; i>0; i--) {
    stars.push(
      <RatingStar
        isDisabled = {isDisabled}
        number = {i}
        key={`${i}-star`}
      />);
  }
  return stars;
}

function ReviewForm({api}: ReviewFormProps): JSX.Element {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const filmId = useSelector(getCurrentFIlmId);

  const dispatch = useDispatch();

  const addComment = async (id: number): Promise<void> => {
    try {
      const {data} = await api.post<GetCommentType[]>(`${APIRoute.Comments}/${id}`, {rating, comment});
      dispatch(updateComments(data));
      window.history.back();
    } catch (error) {
      setIsDisabled(false);
      toast.info(ERROR_MESSAGE);
    }
  };

  return (
    <div className="add-review">
      <form
        className="add-review__form"
        onSubmit={(evt) => {
          evt.preventDefault();
          setIsDisabled(true);
          addComment(filmId);
        }}
      >
        <div className="rating">
          <div
            className="rating__stars"
            onClick={({target}: BaseSyntheticEvent) => {
              setRating(Number(target.value));}}
          >
            {getRatingStars(isDisabled)}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            disabled = {isDisabled}
            className="add-review__textarea"
            name="review-text" id="review-text"
            placeholder="Review text"
            minLength={50}
            maxLength={400}
            onInput={({target}: BaseSyntheticEvent) => {
              setComment(target.value);}}
          >
          </textarea>
          <div className="add-review__submit">
            <button
              disabled = {isDisabled}
              className="add-review__btn"
              type="submit"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default memo(ReviewForm);

