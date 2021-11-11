import {ActionType} from '../types/action';
import {FilmType} from '../types/film-type';
import {AuthorizationStatus} from '../const';
import {createAction} from '@reduxjs/toolkit';


export const changeGenre = createAction(
  ActionType.ChangeGenre,
  (genre: string) => ({
    payload: genre,
  }));

export const filterFilmListByGenre = createAction(
  ActionType.FilterFilmsByGenre,
  (films: FilmType[]) => ({
    payload: films,
  }));

export const loadFilms = createAction(
  ActionType.LoadFilms,
  (filmList: FilmType[]) => ({
    payload: {
      filmList,
    },
  }));

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }));

export const requireLogout = createAction(ActionType.RequireLogout);
