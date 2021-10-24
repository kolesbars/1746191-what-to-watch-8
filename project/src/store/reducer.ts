import {State} from '../types/state';
import {ActionType, Actions} from '../types/action';
import {films} from '../mocks/films';
import {FilterFilmsByGenre} from '../utils/common';

const initialState: State = {
  genre: 'All genres',
  filmList: films,
};

function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload};
    case ActionType.FilterFilmsByGenre:
      return {...state, filmList: FilterFilmsByGenre(action.payload, state.genre)};
    default:
      return state;
  }
}

export {reducer};
