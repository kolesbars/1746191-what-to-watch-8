import {AxiosInstance} from 'axios';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {State} from './state';
import {changeGenre, filterFilmListByGenre, loadFilms} from '../store/action';

export enum ActionType {
  ChangeGenre = 'changeGenre',
  FilterFilmsByGenre = 'filterFilmsByGenre',
  LoadFilms = 'loadFilms',
}

export type Actions =
| ReturnType<typeof changeGenre>
| ReturnType<typeof filterFilmListByGenre>
| ReturnType<typeof loadFilms>


export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
