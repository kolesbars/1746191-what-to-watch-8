import {ThunkActionResult} from '../types/action';
import {loadFilms} from './action';
import {APIRoute} from '../const';
import {FilmType} from '../types/film-type';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<FilmType[]>(APIRoute.Films);
    dispatch(loadFilms(data));
  };
