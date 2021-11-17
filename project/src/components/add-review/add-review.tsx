import {Link} from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';
import Header from '../header/header';
import {useSelector} from 'react-redux';
import {getFilmData} from '../../store/selectors';
import {AxiosInstance} from 'axios';

type AddReviewProps = {
  api: AxiosInstance
}

function AddReview({api}: AddReviewProps): JSX.Element {
  const filmData = useSelector(getFilmData);
  const {name, backgroundImage, id, posterImage} = filmData;

  const getHeaderNav = () => (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to={`/films/${id}/review`}>Add review</Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header
          element = {getHeaderNav()}
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
