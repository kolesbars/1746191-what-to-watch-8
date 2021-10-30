import {FilmList} from '../film-list/film-list';
import {FilmType} from '../../types/film-type';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import GenresList from './genres-list';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import Loading from '../loading/loading';
import Footer from '../footer/footer';

type MainScreenProps = {
  title: string,
  genre: string,
  date: number,
  films: FilmType[],
}

const mapStateToProps = ({filmList, isDataLoaded, authorizationStatus}: State) => ({
  filmList,
  isDataLoaded,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainScreenProps;

function Main(props: ConnectedComponentProps): JSX.Element {
  const history = useHistory();

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <Link className="logo__link" to="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                {props.authorizationStatus === AuthorizationStatus.NoAuth ?
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /> :
                  ''}
              </div>
            </li>
            <li className="user-block__item">
              {props.authorizationStatus === AuthorizationStatus.NoAuth ?
                <Link className="user-block__link" to="/login">@mail.ru</Link> :
                <Link className="user-block__link" to="/login">Sign in</Link>}
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{props.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.genre}</span>
                <span className="film-card__year">{props.date}</span>
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
            films={props.films}
          />
          <div className="catalog__films-list">
            {props.isDataLoaded ?
              <FilmList
                films = {props.filmList}
              /> :
              <Loading/>}
          </div>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>
        <Footer/>
      </div>
    </>);
}

export {Main};
export default connector(Main);
