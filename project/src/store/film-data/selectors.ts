import {NameSpace} from '../root-reduser';
import {State} from '../../types/state';
import {FilmType} from '../../types/film-type';

export const getFilmData = (state: State): FilmType => state[NameSpace.data].currentFilm;
