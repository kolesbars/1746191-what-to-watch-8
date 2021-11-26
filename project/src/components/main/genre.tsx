import {FilmType} from '../../types/film-type';

type GenreProps ={
  genre: string;
  isActiveGenre: boolean;
  onChangeGenre: (genre: string) => void;
  films: FilmType[];
}

function Genre({genre, isActiveGenre, onChangeGenre, films}: GenreProps): JSX.Element {
  function getGenreName(genreName: string): string {
    switch (genreName) {
      case 'Comedy':
        return 'Comedies';
      case 'Thriller':
        return'Thrillers';
      case 'Drama':
        return 'Dramas';
      default:
        return genre;
    }
  }

  return (
    <li className={`catalog__genres-item ${isActiveGenre ? 'catalog__genres-item--active' : ''}`}
      onClick = {(evt) => {
        evt.preventDefault();
        onChangeGenre(genre);
      }}
    >
      <a href="{url}" className="catalog__genres-link">{getGenreName(genre)}</a>
    </li>
  );
}

export default Genre;
