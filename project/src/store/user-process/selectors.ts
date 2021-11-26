import {NameSpace} from '../root-reduser';
import {State} from '../../types/state';
import {AuthorizationStatus} from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.user].authorizationStatus;
