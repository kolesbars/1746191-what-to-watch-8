import {createReducer} from '@reduxjs/toolkit';
import {adaptToClient} from '../../utils/common';
import {emptyComment, emptyFilm} from '../../const';
import {updateComments, loadCurrentFilm} from '../action';
import {FilmData} from '../../types/state';

const initialState: FilmData= {
  currentFilmComments: [emptyComment],
  currentFilm: emptyFilm,
};

const filmsData = createReducer(initialState, (builder) => {
  builder
    .addCase(updateComments, (state, action) => {
      state.currentFilmComments = action.payload;
    })
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentFilm = adaptToClient(action.payload);
    });
});

export {filmsData};
