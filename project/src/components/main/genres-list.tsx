import {FilmType} from '../../types/film-type';
import Genre from './genre';
import {useSelector, useDispatch} from 'react-redux';
import {changeGenre, filterFilmListByGenre} from '../../store/action';
import {getGenre} from '../../store/selectors';

type GenresListProps = {
  films: FilmType[]
}

function GenresList(props: GenresListProps): JSX.Element {
  const {films} = props;
  const genre = useSelector(getGenre);
  const dispatch = useDispatch();

  const onChangeGenre = (currentGenre: string) => {
    dispatch(changeGenre(currentGenre));
  };

  const onFilterFilmListByGenre = (filmList: FilmType[]) => {
    dispatch(filterFilmListByGenre(filmList));
  };

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

export default GenresList;
