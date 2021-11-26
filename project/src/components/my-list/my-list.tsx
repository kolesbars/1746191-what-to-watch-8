import {FilmList} from '../film-list/film-list';
import {FilmType} from '../../types/film-type';
import {APIRoute, ErrorMessage} from '../../const';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import {emptyFilm} from '../../const';
import {AxiosInstance} from 'axios';
import {adaptToClient} from '../../utils/common';
import {toast} from 'react-toastify';
import Header from '../header/header';
import Footer from '../footer/footer';

type MyListProps = {
  api: AxiosInstance,
}

function MyList({api}: MyListProps):JSX.Element {
  const getTitle = () => <h1 className="page-title user-page__title">My list</h1>;

  const history = useHistory();

  const [favoriteFilms, setFavoriteFilms] = useState([emptyFilm]);

  const loadFavoriteFilms = async () => {
    try {
      const {data} = await api.get<FilmType[]>(APIRoute.Favorite);
      setFavoriteFilms(data);
    } catch {
      toast.info(ErrorMessage.LoadDataFail);
    }
  };

  useEffect(() => {
    loadFavoriteFilms();
  }, [history.location.pathname]);

  const adaptedFavoriteFilms = favoriteFilms.map((film) => adaptToClient(film));

  return (
    <div className="user-page">
      <Header
        element = {getTitle()}
      />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmList films = {adaptedFavoriteFilms}/>
        </div>
      </section>
      <Footer/>
    </div>);
}

export default MyList;
