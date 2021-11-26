import {NameSpace} from '../root-reduser';
import {State} from '../../types/state';
import {FilmType} from '../../types/film-type';
import {createSelector} from 'reselect';

export const getFilmList = (state: State): FilmType[] => state[NameSpace.list].filmList;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.list].isDataLoaded;
export const getGenre = (state: State): string => state[NameSpace.list].genre;

export const selectFilmsByGenre = createSelector(getFilmList, getGenre, (films, genre) => {
  if (genre === 'All genres') {
    return films;
  }

  return films.filter((film) => film.genre === genre);
});

export const selectGenresFromFilmList = createSelector(getFilmList, (films) => {
  const genresList = ['All genres'];

  films.forEach((film) => {
    if (!genresList.includes(film.genre)) {
      genresList.push(film.genre);
    }
  });
  return genresList;
});
