import {AxiosInstance} from 'axios';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {State} from './state';
import {
  changeGenre,
  filterFilmListByGenre,
  loadFilms,
  changeAuthorizationStatus,
  requireAuthorization
} from '../store/action';

export enum ActionType {
  ChangeGenre = 'changeGenre',
  FilterFilmsByGenre = 'filterFilmsByGenre',
  LoadFilms = 'loadFilms',
  ChangeAuthorizationStatus = 'changeAuthorizationStatus',
  RequireAuthorization = 'requireAuthorization',
}

export type Actions =
| ReturnType<typeof changeGenre>
| ReturnType<typeof filterFilmListByGenre>
| ReturnType<typeof loadFilms>
| ReturnType<typeof changeAuthorizationStatus>
| ReturnType<typeof requireAuthorization>

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
