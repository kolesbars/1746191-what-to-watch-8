import {ThunkActionResult} from '../types/action';
import {loadFilms, loadCurrentFilm, requireAuthorization, requireLogout} from './action';
import {APIRoute, AuthorizationStatus, ErrorMessage} from '../const';
import {FilmType} from '../types/film-type';
import {AuthData} from '../types/auth-data';
import {Token, saveToken, dropToken} from '../services/token';
import {toast} from 'react-toastify';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<FilmType[]>(APIRoute.Films);
      dispatch(loadFilms(data));
    } catch {
      toast.info(ErrorMessage.LoadFilmsFail);
    }
  };

export const fetchCurrentFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get<FilmType>(`${APIRoute.Films}/${id}`);
      dispatch(loadCurrentFilm(data));
    } catch {
      toast.info(ErrorMessage.LoadFilmFail);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.info(ErrorMessage.AuthFail);
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
    try {
      api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireLogout());
    } catch {
      toast.info(ErrorMessage.LogoutFail);
    }
  };
