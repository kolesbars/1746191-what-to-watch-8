import {FilmList} from '../film-list/film-list';
import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {AppRoute, APIRoute, ErrorMessage} from '../../const';
import {useSelector} from 'react-redux';
import {FilmType} from '../../types/film-type';
import {getLoadedDataStatus, getGenre, getFilmList, selectFilmsByGenre} from '../../store/list-process/selectors';
import {emptyFilm} from '../../const';
import {adaptToClient} from '../../utils/common';
import {toast} from 'react-toastify';
import {AxiosInstance} from 'axios';
import GenresList from '../genre-list/genres-list';
import Loading from '../loading/loading';
import Header from '../header/header';
import Footer from '../footer/footer';
import ShowMoreButton from '../show-more-button/show-more-button';

const FILMS_COUNT = 8;

type MainScreenProps = {
  api: AxiosInstance,
  changeStatusFunction: (id: number, filmStatus: boolean, cb: (data: boolean) => void) => Promise<void>
}

function Main(props: MainScreenProps): JSX.Element {
  const {api, changeStatusFunction} = props;

  const genre = useSelector(getGenre);
  const unfilteredFilms = useSelector(getFilmList);
  const isDataLoaded = useSelector(getLoadedDataStatus);
  const films = useSelector(selectFilmsByGenre);

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [filmsCount, setFilmsCount] = useState(FILMS_COUNT);
  const [promoFilmData, setPromoFilmData] = useState(emptyFilm);
  const [filmStatus, setFilmStatus] = useState(false);

  const loadPromoFilmData = async () => {
    try {
      setIsLoading(true);
      const {data} = await api.get<FilmType>(APIRoute.Promo);
      setPromoFilmData(adaptToClient(data));
      setIsLoading(false);
    } catch {
      toast.info(ErrorMessage.LoadDataFail);
    }
  };

  useEffect(() => {
    loadPromoFilmData();
    setFilmStatus(promoFilmData.isFavorite);
  }, [promoFilmData.isFavorite, history.location.pathname]);

  useEffect(() => {
    setFilmsCount(FILMS_COUNT);
  }, [genre, history.location.pathname]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilmData.backgroundImage} alt={promoFilmData.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header/>
        <div className="film-card__wrap">
          <div className="film-card__info">
            {isLoading ? <Loading/> :
              <>
                <div className="film-card__poster">
                  <img
                    src={promoFilmData.posterImage}
                    alt={`${promoFilmData.name} poster`}
                    width="218"
                    height="327"
                  />
                </div>
                <div className="film-card__desc">
                  <h2 className="film-card__title">{promoFilmData.name}</h2>
                  <p className="film-card__meta">
                    <span className="film-card__genre">{promoFilmData.genre}</span>
                    <span className="film-card__year">{promoFilmData.released}</span>
                  </p>

                  <div className="film-card__buttons">
                    <button className="btn btn--play film-card__button" type="button"
                      onClick={() => history.push(`${AppRoute.Player}/${promoFilmData.id}`)}
                    >
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </button>
                    <button
                      className="btn btn--list film-card__button"
                      type="button"
                      onClick={() => {
                        changeStatusFunction(promoFilmData.id, filmStatus, setFilmStatus);
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
                  </div>
                </div>
              </>}
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
