import {combineReducers} from 'redux';
import {filmsData} from './film-data/film-data';
import {userProcess} from './user-process/user-process';
import {listProcess} from './list-process/list-process';

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
  list = 'LIST',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: filmsData,
  [NameSpace.user]: userProcess,
  [NameSpace.list]: listProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
