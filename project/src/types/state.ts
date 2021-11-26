import {FilmType} from './film-type';
import {CommentType} from './comment-type';
import {AuthorizationStatus} from '../const';
import {RootState} from '../store/root-reduser';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
}

export type FilmData = {
  currentFilmComments: CommentType[],
  currentFilm: FilmType,
};

export type ListProcess = {
  isDataLoaded: boolean,
  genre: string,
  filmList: FilmType[],
};

export type State = RootState;
