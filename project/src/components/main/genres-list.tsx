import {FilmType} from '../../types/film-type';
import Genre from './genre';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import {changeGenre, filterFilmListByGenre} from '../../store/action';


type GenresListProps = {
  films: FilmType[]
}

const mapStateToProps = ({genre}: State) => ({
  genre,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeGenre(genre: string) {
    dispatch(changeGenre(genre));
  },
  onFilterFilmListByGenre(films: FilmType[]) {
    dispatch(filterFilmListByGenre(films));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & GenresListProps;

function GenresList(props: ConnectedComponentProps): JSX.Element {
  const {films, genre, onChangeGenre, onFilterFilmListByGenre} = props;

  const unfilteredFilms = films.slice();

  const getGenresList = () => {
    const genresList = ['All genres'];

    unfilteredFilms.forEach((film) => {
      if (!genresList.includes(film.genre)) {
        genresList.push(film.genre);
      }
    });
    return genresList;
  };

  return (
    <ul className="catalog__genres-list">
      {getGenresList().map((genreName) =>
        (
          <Genre
            key = {genreName}
            genre = {genreName}
            isActiveGenre = {genre === genreName}
            onChangeGenre = {onChangeGenre}
            onFilterFilmListByGenre = {onFilterFilmListByGenre}
            films = {unfilteredFilms}
          />))}
    </ul>
  );
}

export {GenresList};
export default connector(GenresList);
