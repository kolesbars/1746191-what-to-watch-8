import {FilmList} from '../film-list/film-list';
import {FilmType} from '../../types/film-type';
import Header from '../header/header';
import Footer from '../footer/footer';

type MyListProps = {
  films: FilmType[]
}

function MyList(props: MyListProps):JSX.Element {
  const getTitle = () => <h1 className="page-title user-page__title">My list</h1>;
  return (
    <div className="user-page">
      <Header
        element = {getTitle()}
      />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmList films = {props.films}/>
        </div>
      </section>
      <Footer/>
    </div>);
}

export default MyList;
