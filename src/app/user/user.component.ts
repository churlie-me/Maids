import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { CacheService } from '../../services/caching.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatCard, MatProgressBarModule, MatIcon],
  templateUrl: './user.component.html'
})
export class UserComponent {
  user: any;
  isLoading: boolean = false;
  constructor(private route: ActivatedRoute, private userService: UserService, private cacheService: CacheService) { }

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];    
    this.getUser(userId);
  }

  async getUser(userId: any) {
    this.isLoading = true;
  
    try {
      const cachedUser = this.cacheService.get(`user_${userId}`);
  
      if (cachedUser) {
        this.user = cachedUser;
        this.isLoading = false;
      } else {
        const data = await this.userService.getUserById(userId).toPromise();
        this.user = data.data;
        this.isLoading = false;
  
        this.cacheService.set(`user_${userId}`, this.user);
      }
    } catch (error) {
      console.error('An error occurred while fetching user data:', error);
      this.isLoading = false;
    }
  }
}
