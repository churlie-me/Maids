import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'users/:page', component: UsersComponent },
    { path: 'user/:id', component: UserComponent }
];
