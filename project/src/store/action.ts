import {ActionType} from '../types/action';
import {FilmType} from '../types/film-type';
import {AuthorizationStatus} from '../const';


export const changeGenre = (genre: string) => ({
  type: ActionType.ChangeGenre,
  payload: genre,
} as const);

export const filterFilmListByGenre = (films: FilmType[]) => ({
  type: ActionType.FilterFilmsByGenre,
  payload: films,
} as const);

export const loadFilms = (filmList: FilmType[]) => ({
  type: ActionType.LoadFilms,
  payload: {
    filmList,
  },
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

