import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(
  selectUserState,
  state => state && state.users
);

export const selectLoading = createSelector(
  selectUserState,
  state => state &&  state.loading
);

export const selectError = createSelector(
  selectUserState,
  state => state && state.error
);