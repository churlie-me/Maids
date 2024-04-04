import { createAction, props } from '@ngrx/store';

export const FETCH_USERS = '[Users] Fetch Users';
export const FETCH_USERS_SUCCESS = '[Users] Fetch Users Success';
export const FETCH_USERS_FAILURE = '[Users] Fetch Users Failure';

export const fetchUsers = createAction(FETCH_USERS, props<{ page: any }>());
export const fetchUsersSuccess = createAction(FETCH_USERS_SUCCESS, props<{ users: any }>());
export const fetchUsersFailure = createAction(FETCH_USERS_FAILURE, props<{ error: any }>());