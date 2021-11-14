import {FilmType} from './film-type';
import {GetCommentType} from './comment-type';
import {AuthorizationStatus} from '../const';

export type State = {
  currentFilmId: number,
  currentFilmComments: GetCommentType[],
  genre: string,
  filmList: FilmType[],
  currentFilm: FilmType,
  unfilteredFilms: FilmType[],
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
}
