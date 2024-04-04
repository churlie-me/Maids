import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { SearchService } from '../../services/search.service';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, FormsModule, MatFormField, MatInputModule, MatLabel, MatIconModule, MatIconButton],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isUserComponent: boolean = false;
  constructor(private searchService: SearchService, private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isUserComponent = event.url.includes('user');
      }
    });
  }

  filterUsers($event: any) {
    this.searchService.setSearch($event?.currentTarget?.value);
  }

  goBack()
  {
    if(this.isUserComponent)
    {
      this.location.back();
    }
  }
}
