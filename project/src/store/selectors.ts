import {State} from '../types/state';
import {FilmType} from '../types/film-type';
import {AuthorizationStatus} from '../const';

export const getFilmList = (state: State): FilmType[] => state.filmList;
export const getFilmData = (state: State): FilmType => state.currentFilm;
export const getLoadedDataStatus = (state: State): boolean => state.isDataLoaded;
export const getUnfilteredFilms = (state: State): FilmType[] => state.unfilteredFilms;
export const getGenre = (state: State): string => state.genre;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.authorizationStatus;
