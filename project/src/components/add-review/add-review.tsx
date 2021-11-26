import ReviewForm from '../../components/review-form/review-form';
import Header from '../header/header';
import HeaderNav from './header-nav';
import {useSelector, useDispatch} from 'react-redux';
import {getFilmData} from '../../store/film-data/selectors';
import {useParams} from 'react-router';
import {useEffect} from 'react';
import {fetchCurrentFilmAction} from '../../store/api-actions';
import {AxiosInstance} from 'axios';

type AddReviewProps = {
  api: AxiosInstance
}

function AddReview({api}: AddReviewProps): JSX.Element {
  const {id} = useParams<{id: string}>();
  const currentId = +id;

  const dispatch = useDispatch();

  const filmData = useSelector(getFilmData);
  const {name, backgroundImage, posterImage} = filmData;

  useEffect(() => {
    dispatch(fetchCurrentFilmAction(currentId));
  }, [currentId]);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header
          element = {
            <HeaderNav
              id={currentId}
              name={name}
            />
          }
        />
        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>
      <ReviewForm
        api = {api}
      />
    </section>
  );
}

export default AddReview;
