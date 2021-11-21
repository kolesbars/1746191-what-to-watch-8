import {ThunkActionResult} from '../types/action';
import {loadFilms, loadCurrentFilm, requireAuthorization, requireLogout} from './action';
import {APIRoute, AuthorizationStatus} from '../const';
import {FilmType} from '../types/film-type';
import {AuthData} from '../types/auth-data';
import {Token, saveToken, dropToken} from '../services/token';
import {toast} from 'react-toastify';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';
const LOAD_FILM_FAIL_MESSAGE = 'Фильма с таким id не существует';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<FilmType[]>(APIRoute.Films);
    dispatch(loadFilms(data));
  };

export const fetchCurrentFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get<FilmType>(`${APIRoute.Films}/${id}`);
      dispatch(loadCurrentFilm(data));
    } catch {
      toast.info(LOAD_FILM_FAIL_MESSAGE);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
