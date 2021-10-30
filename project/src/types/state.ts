import {FilmType} from './film-type';
import {AuthorizationStatus} from '../const';

export type State = {
  genre: string,
  filmList: FilmType[],
  unfilteredFilms: FilmType[],
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
}
