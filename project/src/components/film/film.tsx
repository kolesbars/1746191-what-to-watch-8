import {FilmType} from '../../types/film-type';
import {GetCommentType} from '../../types/comment-type';
import {FilmList} from '../film-list/film-list';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {AppRoute, APIRoute} from '../../const';
import FilmDetails from './film-details';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {getCurrentFIlmId, getFilmData, getFilmList} from '../../store/selectors';
import {AxiosInstance} from 'axios';
import {adaptToClient} from '../../utils/common';
import {emptyFilm, emptyComment} from '../../const';
import {fetchCurrentFilmAction} from '../../store/api-actions';
import {updateComments, updateFilmId} from '../../store/action';

type FilmProps = {
  api: AxiosInstance,
}

function Film(props: FilmProps): JSX.Element {
  const filmId = useSelector(getCurrentFIlmId);
  const filmData = useSelector(getFilmData);
  const filmList = useSelector(getFilmList);

  const filmListArrayId = filmList.map((film) => film.id);

  const [similarFilms, setSimilarFilms] = useState([emptyFilm]);
  const [comments, setComments] = useState([emptyComment]);

  const history = useHistory();

  const loadSimilarFilms = async (id: number): Promise<void> => {
    const {data} = await props.api.get<FilmType[]>(`${APIRoute.Films}/${id}/similar`);
    setSimilarFilms(data.map((film) => adaptToClient(film)));
  };

  const loadComments = async (id: number): Promise<void> => {
    const {data} = await props.api.get<GetCommentType[]>(`${APIRoute.Comments}/${id}`);
    setComments(data);
  };

  const updateId = (currentFilmId: number) => {
    dispatch(updateFilmId(currentFilmId));
  };

  const dispatch = useDispatch();

  const loadFilmData = () => {
    dispatch(fetchCurrentFilmAction(filmId));
  };

  const updateFilmComments = () => {
    dispatch(updateComments(comments));
  };


  useEffect(() => {
    updateId(filmId);
    loadSimilarFilms(filmId);
    loadComments(filmId);
    updateFilmComments();
    loadFilmData();
  }, [filmId]);

  const {
    backgroundImage,
    name,
    genre,
    released,
    posterImage,
  } = filmData;

  if (filmListArrayId.some((id) => window.location.href === `http://localhost:3000/films/${id}`)) {

    return (
      <>
        <section className="film-card film-card--full">
          <div className="film-card__hero">
            <div className="film-card__bg">
              <img src={backgroundImage} alt={name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header film-card__head">
              <div className="logo">
                <Link to="/" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>

              <ul className="user-block">
                <li className="user-block__item">
                  <div className="user-block__avatar">
                    <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                  </div>
                </li>
                <li className="user-block__item">
                  <a className="user-block__link" href="{url}">Sign out</a>
                </li>
              </ul>
            </header>

            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{genre}</span>
                  <span className="film-card__year">{released}</span>
                </p>

                <div className="film-card__buttons">
                  <button className="btn btn--play film-card__button" type="button"
                    onClick={() => history.push(AppRoute.Player)}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list film-card__button" type="button"
                    onClick={() => history.push(AppRoute.MyList)}
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  <Link to="/films/id/review" className="btn film-card__button">Add review</Link>
                </div>
              </div>
            </div>
          </div>

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
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__films-list">
              <FilmList
                films = {similarFilms.filter((film) => film.id !== filmId)}
              />
            </div>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <Link to="/" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  } else {
    return <NotFoundScreen/>;
  }
}

export default Film;
