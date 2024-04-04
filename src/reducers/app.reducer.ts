import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { UserState, userReducer } from './user.reducer';

export interface AppState {
  users: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: userReducer
};

export const rootReducer = combineReducers(reducers);