import {FilmType} from '../../types/film-type';
import {CommentType} from '../../types/comment-type';
import {FilmList} from '../film-list/film-list';
import {Link, useParams, useHistory} from 'react-router-dom';
import {AppRoute, APIRoute, AuthorizationStatus, ErrorMessage} from '../../const';
import FilmDetails from './film-details';
import Header from '../header/header';
import Footer from '../footer/footer';
import Loading from '../loading/loading';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {getFilmData} from '../../store/film-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {AxiosInstance} from 'axios';
import {adaptToClient} from '../../utils/common';
import {emptyFilm, emptyComment} from '../../const';
import {fetchCurrentFilmAction} from '../../store/api-actions';
import {updateComments} from '../../store/action';

type FilmProps = {
  api: AxiosInstance,
  changeStatusFunction: (id: number, filmStatus: boolean, cb: (data: boolean) => void) => Promise<void>,
}

function Film(props: FilmProps): JSX.Element {
  const {id} = useParams<{id: string}>();
  const currentId = +id;

  const filmData = useSelector(getFilmData);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const [isLoading, setIsLoading] = useState(false);
  const [similarFilms, setSimilarFilms] = useState([emptyFilm]);
  const [comments, setComments] = useState([emptyComment]);
  const [filmStatus, setFilmStatus] = useState(false);

  const history = useHistory();

  const loadSimilarFilms = async (filmId: number): Promise<void> => {
    try {
      const {data} = await props.api.get<FilmType[]>(`${APIRoute.Films}/${filmId}/similar`);
      setSimilarFilms(data.map((film) => adaptToClient(film)));
    } catch {
      toast.info(ErrorMessage.LoadDataFail);
    }
  };

  const loadComments = async (filmId: number): Promise<void> => {
    try {
      const {data} = await props.api.get<CommentType[]>(`${APIRoute.Comments}/${filmId}`);
      setComments(data);
    } catch {
      toast.info(ErrorMessage.LoadDataFail);
    }
  };

  const dispatch = useDispatch();

  const loadFilmData = async () => {
    setIsLoading(true);

    try {
      await dispatch(fetchCurrentFilmAction(currentId));
      await loadComments(currentId);
      await loadSimilarFilms(currentId);
      dispatch(updateComments(comments));
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      history.push(AppRoute.NotFoundScreen);
    }
  };

  useEffect(() => {
    loadFilmData();
    setFilmStatus(filmData.isFavorite);
  }, [currentId, filmData.isFavorite]);

  const {
    backgroundImage,
    name,
    genre,
    released,
    posterImage,
  } = filmData;

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header/>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => history.push(`${AppRoute.Player}/${currentId}`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button"
                  onClick={() => {
                    props.changeStatusFunction(currentId, filmStatus, setFilmStatus);
                  }}
                >
                  {filmStatus ?
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg> :
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>}
                  <span>My list</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth &&
                  <Link
                    to={`/films/${currentId}/review`}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>}
              </div>
            </div>
          </div>
        </div>
        {isLoading ? <Loading/> :
          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <img src={posterImage} alt={name} width="218" height="327" />
              </div>
              <FilmDetails
                data = {filmData}
                comments = {comments}
              />
            </div>
          </div>}
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <FilmList
              films = {similarFilms.filter((film) => film.id !== currentId).slice(0, 4)}
            />
          </div>
        </section>
        <Footer/>
      </div>
    </>
  );
}

export default Film;
