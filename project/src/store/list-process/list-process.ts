import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, loadFilms} from '../action';
import {FilmType} from '../../types/film-type';
import {ListProcess} from '../../types/state';
import {adaptToClient} from '../../utils/common';

const initialState: ListProcess = {
  genre: 'All genres',
  filmList: [],
  isDataLoaded: false,
};

const listProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.isDataLoaded = true;
      state.filmList = action.payload.filmList.map((film: FilmType) => adaptToClient(film));
    });
});

export {listProcess};
