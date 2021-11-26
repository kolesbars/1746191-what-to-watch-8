import {AxiosInstance} from 'axios';
import {ThunkAction} from 'redux-thunk';
import {State} from './state';
import {Action} from 'redux';

export enum ActionType {
  ChangeGenre = 'list/changeGenre',
  FilterFilmsByGenre = 'list/filterFilmsByGenre',
  LoadFilms = 'list/loadFilms',
  UpdateComments = 'data/updateComments',
  LoadCurrentFilm = 'data/loadCurrentFilm',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
