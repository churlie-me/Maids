import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { fetchUsers, fetchUsersSuccess, fetchUsersFailure } from '../actions/user.actions';
import { Store, select } from '@ngrx/store';
import { selectUsers } from '../selectors/user.selector'
import { AppState } from '../reducers/app.reducer';

@Injectable()
export class UserEffects {

  fetchUsers$ = createEffect(() => this.actions$.pipe(
    ofType(fetchUsers),
    withLatestFrom(this.store.pipe(select(selectUsers))), 
    mergeMap(async ([action, selectUsers]) => {
      try {
        debugger
        console.log(action.page);
        const users = await this.userService.getUsers(action.page).toPromise();
        selectUsers = users.data;
        return fetchUsersSuccess({ users });
      } catch (error) {
        return fetchUsersFailure({ error });
      }
    })
  ));

  constructor(private actions$: Actions, private userService: UserService, private store: Store<AppState>) {}
}