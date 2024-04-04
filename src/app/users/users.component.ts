import { Component } from '@angular/core';
import { MatCard, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { CacheService } from '../../services/caching.service';

import { Store, select } from '@ngrx/store';
import { selectUsers, selectLoading, selectError } from '../../selectors/user.selector';
import { AppState } from '../../reducers/app.reducer';
import { fetchUsers, fetchUsersFailure } from '../../actions/user.actions';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardFooter, MatCardTitle, MatPaginator, MatProgressBarModule,
            HttpClientModule, CommonModule],
  templateUrl: './users.component.html',
  styles:[`
  ::ng-deep .mat-mdc-paginator-container {
    background: #ffffff !important;
  }
  ::ng-deep .mat-mdc-paginator-navigation-next .mat-mdc-paginator-icon{
    fill: #ff0000 !important;
  }
  ::ng-deep .mat-mdc-paginator-navigation-previous .mat-mdc-paginator-icon{
    fill: #ff0000 !important;
  }
  ::ng-deep .mat-mdc-paginator-navigation-last .mat-mdc-paginator-icon {
    fill: #ff0000 !important;
  }
  ::ng-deep .mat-mdc-paginator-navigation-first .mat-mdc-paginator-icon {
    fill: #ff0000 !important;
  }
  ::ng-deep .mat-mdc-paginator {
    color: #ff0000 !important;
  }
  ::ng-deep .mat-mdc-paginator-page-size .mat-mdc-select {
    color: #ff0000 !important;
  }
  ::ng-deep .mat-mdc-paginator-page-size .mat-mdc-select-arrow {
    color: #ff0000 !important;
  }
  ::ng-deep .mat-mdc-paginator-page-size .mdc-notched-outline__trailing, 
  ::ng-deep .mat-mdc-paginator-page-size .mdc-notched-outline__leading
  {
    border-color: #ff0000 !important;
  }
  `]
})
export class UsersComponent {
  users$: Observable<any> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<any> | undefined;

  users_data: any;
  filtered_users: any;
  isLoading: boolean = false;
  constructor(private route: ActivatedRoute, private userService: UserService, 
              private searchService: SearchService, private cacheService: CacheService,
              private store: Store<AppState>) { }

  async ngOnInit()
  {
    debugger
    this.users$ = this.store.pipe(select(selectUsers));
    this.loading$ = this.store.pipe(select(selectLoading));
    this.error$ = this.store.pipe(select(selectError));

    this.fetchUsers(1);
    this.initiateSearch();

    await this.store.dispatch(fetchUsers({ page: 1 }));

    await this.users$.subscribe(users => {
      console.log(users);
    });
  }

  async initiateSearch() {
    try
    {
      await this.searchService.getSearch().subscribe((searchValue: any) => {
        this.filterUsers(searchValue)
      })
    } catch (error) {
      console.error('An error occurred while fetching a search value:', error);
    }
  }

  async fetchUsers(page: number) {
    this.isLoading = true;
  
    try {
      const cachedData = this.cacheService.get(`users_data_page_${page}`);
  
      if (cachedData) {
        this.users_data = cachedData;
        this.isLoading = false;
      } else {
        await this.userService.getUsers(page).subscribe(
          (data: any) => {
            this.users_data = data;
            this.isLoading = false;
            this.cacheService.set(`users_data_page_${page}`, data);
          },
          (error: any) => {
            console.error('An error occurred while fetching users:', error);
            this.isLoading = false;
          }
        );
      }
    } catch (error) {
      console.error('An error occurred during data retrieval:', error);
      this.isLoading = false;
    }
  }

  filterUsers(searchValue: any) {
    debugger
    try
    {
      if (searchValue) {
        this.filtered_users = this.users_data.data.filter((u: { id: number; }) => u.id.toString().includes(searchValue));
      } else {
        this.filtered_users = this.users_data.data;
      }
    } catch (error) {
      console.error('An error occurred during data retrieval:', error);
    }
  }

  onPageChange($event: any) {
    this.fetchUsers($event.pageIndex + 1);
  }
}