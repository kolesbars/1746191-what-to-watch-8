import {FilmList} from '../film-list/film-list';
import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {AppRoute} from '../../const';
import GenresList from './genres-list';
import {useSelector} from 'react-redux';
import Loading from '../loading/loading';
import Header from '../header/header';
import Footer from '../footer/footer';
import ShowMoreButton from './show-more-button';
import {FilmType} from '../../types/film-type';
import {getGenre, getUnfilteredFilms, getLoadedDataStatus} from '../../store/selectors';

const FILMS_COUNT = 8;

type MainScreenProps = {
  title: string,
  promoGenre: string,
  date: number,
  films: FilmType[],
}

function Main(props: MainScreenProps): JSX.Element {
  const {title, promoGenre, date, films} = props;

  const genre = useSelector(getGenre);
  const unfilteredFilms = useSelector(getUnfilteredFilms);
  const isDataLoaded = useSelector(getLoadedDataStatus);
  const history = useHistory();

  const [filmsCount, setFilmsCount] = useState(FILMS_COUNT);

  useEffect(() => {
    setFilmsCount(FILMS_COUNT);
  }, [genre, history.location.pathname]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header/>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoGenre}</span>
                <span className="film-card__year">{date}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList
            films={unfilteredFilms}
          />
          <div className="catalog__films-list">
            {isDataLoaded ?
              <FilmList
                films = {films.slice(0, filmsCount)}
              /> :
              <Loading/>}
          </div>
          {
            filmsCount <= films.length ?
              <ShowMoreButton
                filmCount = {filmsCount}
                inc = {FILMS_COUNT}
                setFilmsCount = {setFilmsCount}
              /> : ''
          }
        </section>
        <Footer/>
      </div>
    </>);
}

export default Main;
