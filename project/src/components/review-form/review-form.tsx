import {useState, BaseSyntheticEvent} from 'react';
import RatingStar from './rating-star';
import {memo} from 'react';
import {AxiosInstance} from 'axios';
import {CommentType} from '../../types/comment-type';
import {APIRoute} from '../../const';
import {updateComments} from '../../store/action';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useParams, useHistory} from 'react-router-dom';

type ReviewFormProps = {
  api: AxiosInstance
}

enum ReviewLength {
  Max = 400,
  Min = 50,
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

  const history = useHistory();

  const {id} = useParams<{id: string}>();

  const currentId = +id;

  const dispatch = useDispatch();

  const addComment = async (filmId: number): Promise<void> => {
    try {
      const {data} = await api.post<CommentType[]>(`${APIRoute.Comments}/${filmId}`, {rating, comment});
      dispatch(updateComments(data));
      history.goBack();
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
          addComment(currentId);
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
            name="review-text"
            id="review-text"
            placeholder="Review text"
            minLength={ReviewLength.Min}
            maxLength={ReviewLength.Max}
            onInput={({target}: BaseSyntheticEvent) => {
              setComment(target.value);
            }}
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

