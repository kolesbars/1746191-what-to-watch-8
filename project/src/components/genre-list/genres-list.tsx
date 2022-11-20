import {FilmType} from '../../types/film-type';
import {useSelector, useDispatch} from 'react-redux';
import {changeGenre} from '../../store/action';
import {getGenre, selectGenresFromFilmList} from '../../store/list-process/selectors';
import Genre from '../genre/genre';

type GenresListProps = {
  films: FilmType[]
}

function GenresList(props: GenresListProps): JSX.Element {
  const {films} = props;
  const genre = useSelector(getGenre);
  const genreList = useSelector(selectGenresFromFilmList);

  const dispatch = useDispatch();

  const onChangeGenre = (currentGenre: string) => {
    dispatch(changeGenre(currentGenre));
  };

  return (
    <ul className="catalog__genres-list">
      {genreList.slice(0, 10).map((genreName) =>
        (
          <Genre
            key = {genreName}
            genre = {genreName}
            isActiveGenre = {genre === genreName}
            onChangeGenre = {onChangeGenre}
            films = {films}
          />))}
    </ul>
  );
}

export default GenresList;
