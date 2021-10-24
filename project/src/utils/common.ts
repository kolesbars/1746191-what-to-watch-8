import {FilmType} from '../types/film-type';

const FilterFilmsByGenre = (filmsList: FilmType[] , genre: string): FilmType[] => {
  if (genre === 'All genres') {
    return filmsList;
  }

  return filmsList.filter((film) => film.genre === genre);
};

export {FilterFilmsByGenre};

