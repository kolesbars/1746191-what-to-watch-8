import {FilmType} from './film-type';
import {CommentType} from './comment-type';
import {AuthorizationStatus} from '../const';

export type State = {
  currentFilmComments: CommentType[],
  genre: string,
  filmList: FilmType[],
  currentFilm: FilmType,
  unfilteredFilms: FilmType[],
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
}
