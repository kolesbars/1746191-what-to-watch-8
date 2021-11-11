import {State} from '../types/state';
import {FilterFilmsByGenre} from '../utils/common';
import {adaptToClient} from '../utils/common';
import {FilmType} from '../types/film-type';
import {AuthorizationStatus} from '../const';
import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, filterFilmListByGenre, loadFilms, requireAuthorization, requireLogout} from '../store/action';

const initialState: State = {
  genre: 'All genres',
  filmList: [],
  unfilteredFilms: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(filterFilmListByGenre, (state, action) => {
      state.filmList = FilterFilmsByGenre(action.payload, state.genre);
    })
    .addCase(loadFilms, (state, action) => {
      state.isDataLoaded = true;
      state.filmList = action.payload.filmList.map((film: FilmType) => adaptToClient(film));
      state.unfilteredFilms = action.payload.filmList.map((film: FilmType) => adaptToClient(film));
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export {reducer};
