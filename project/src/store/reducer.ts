import {State} from '../types/state';
import {ActionType, Actions} from '../types/action';
import {FilterFilmsByGenre} from '../utils/common';
import {adaptToClient} from '../utils/common';
import {FilmFromServerType} from '../types/film-type';
import {AuthorizationStatus} from '../const';

const initialState: State = {
  genre: 'All genres',
  filmList: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload};
    case ActionType.FilterFilmsByGenre:
      return {...state, filmList: FilterFilmsByGenre(action.payload, state.genre)};
    case ActionType.LoadFilms:
      return {...state, isDataLoaded: true, filmList: action.payload.filmList.map(
        (film: FilmFromServerType) => adaptToClient(film),
      )};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    default:
      return state;
  }
}

export {reducer};
