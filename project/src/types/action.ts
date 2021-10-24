import {FilmType} from './film-type';

export enum ActionType {
  ChangeGenre = 'changeGenre',
  FilterFilmsByGenre = 'filterFilmsByGenre',
}

export type ChangeGenreAction = {
  type: ActionType.ChangeGenre;
  payload: string;
};

export type FilterFilmsByGenreAction = {
  type: ActionType.FilterFilmsByGenre;
  payload: FilmType[];
};

export type Actions = ChangeGenreAction | FilterFilmsByGenreAction;
