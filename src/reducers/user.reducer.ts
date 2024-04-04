import { createReducer, on } from '@ngrx/store';
import { fetchUsers, fetchUsersSuccess, fetchUsersFailure } from '../actions/user.actions';

export interface UserState {
  users: any;
  page: number;
  loading: boolean;
  error: any;
}

const state: UserState = {
  users: undefined,
  page: 1,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  state,
  on(fetchUsers, state => ({
    ...state,
    page: state.page,
    loading: true,
    error: null
  })),
  on(fetchUsersSuccess, (state, { users }) => { 
    debugger
    return ({
    ...state,
    users: users,
    loading: false,
    error: null
  }) }),
  on(fetchUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);