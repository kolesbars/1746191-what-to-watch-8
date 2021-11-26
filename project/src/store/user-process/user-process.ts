import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';
import {requireAuthorization, requireLogout} from '../action';
import {UserProcess} from '../../types/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export {userProcess};
