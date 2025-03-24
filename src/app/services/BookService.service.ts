import { Observable } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { Book } from '../interfaces/Book.interface';
import { BookData } from '../types/types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiService = inject(ApiService);

  create(data: BookData): Observable<Book> {
    return this.apiService.createBook('books', data);
  }

  find(params?: Params): Observable<Book[]> {
    return this.apiService.getBooks('books', params);
  }

  // update(id: number, data: PartialBookData): Observable<Book[]> {
  //   return this.apiService.updateBook('books', id, data);
  // }

  // delete(id: number): Observable<Book[]> {
  //   return this.apiService.deleteBook('books', id);
  // }
}
