import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new Subject<any>();

  setSearch(value: any) {
    this.searchSubject.next(value);
  }

  getSearch() {
    return this.searchSubject.asObservable();
  }
}