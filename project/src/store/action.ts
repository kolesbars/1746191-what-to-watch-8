import {ActionType} from '../types/action';
import {FilmType} from '../types/film-type';
import {AuthorizationStatus} from '../const';
import {createAction} from '@reduxjs/toolkit';
import {CommentType} from '../types/comment-type';


export const changeGenre = createAction(
  ActionType.ChangeGenre,
  (genre: string) => ({
    payload: genre,
  }));

export const updateComments = createAction(
  ActionType.UpdateComments,
  (comments: CommentType[]) => ({
    payload: comments,
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

export const loadCurrentFilm = createAction(
  ActionType.LoadCurrentFilm,
  (film: FilmType) => ({
    payload: film,
  }));

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }));

export const requireLogout = createAction(ActionType.RequireLogout);
