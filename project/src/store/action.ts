import {ActionType, ChangeGenreAction, FilterFilmsByGenreAction} from '../types/action';
import {films} from '../mocks/films';

export const changeGenre = (genre: string): ChangeGenreAction => ({
  type: ActionType.ChangeGenre,
  payload: genre,
});

export const filterFilmListByGenre = (): FilterFilmsByGenreAction => ({
  type: ActionType.FilterFilmsByGenre,
  payload: films,
});
