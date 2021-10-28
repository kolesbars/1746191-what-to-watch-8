import {ActionType} from '../types/action';
import {films} from '../mocks/films';
import {FilmFromServerType} from '../types/film-type';
import {AuthorizationStatus} from '../const';


export const changeGenre = (genre: string) => ({
  type: ActionType.ChangeGenre,
  payload: genre,
} as const);

export const filterFilmListByGenre = () => ({
  type: ActionType.FilterFilmsByGenre,
  payload: films,
} as const);

export const loadFilms = (filmList: FilmFromServerType[]) => ({
  type: ActionType.LoadFilms,
  payload: {
    filmList,
  },
}as const);

export const changeAuthorizationStatus = () => ({
  type: ActionType.ChangeAuthorizationStatus,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

