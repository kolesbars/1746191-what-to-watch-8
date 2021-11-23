import {AxiosInstance} from 'axios';
import {ThunkAction} from 'redux-thunk';
import {State} from './state';
import {Action} from 'redux';

export enum ActionType {
  UpdateFilmId= 'updateFilmId',
  UpdateComments = 'updateComments',
  ChangeGenre = 'changeGenre',
  FilterFilmsByGenre = 'filterFilmsByGenre',
  LoadFilms = 'loadFilms',
  LoadCurrentFilm = 'loadCurrentFilm',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
