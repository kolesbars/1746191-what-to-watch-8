import {ActionType} from '../types/action';
import {films} from '../mocks/films';
import {FilmType} from '../types/film-type';


export const changeGenre = (genre: string) => ({
  type: ActionType.ChangeGenre,
  payload: genre,
} as const);

export const filterFilmListByGenre = () => ({
  type: ActionType.FilterFilmsByGenre,
  payload: films,
} as const);

export const loadFilms = (filmList: FilmType[]) => ({
  type: ActionType.LoadFilms,
  payload: {
    filmList,
  },
}as const);
