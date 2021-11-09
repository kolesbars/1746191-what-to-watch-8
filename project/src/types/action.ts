import {AxiosInstance} from 'axios';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {State} from './state';
import {Action} from 'redux';

export enum ActionType {
  ChangeGenre = 'changeGenre',
  FilterFilmsByGenre = 'filterFilmsByGenre',
  LoadFilms = 'loadFilms',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
