import { map, Observable, of } from 'rxjs';

import { inject, Injectable } from '@angular/core';

import { Book } from '../interfaces/Book.interface';
import { MockService } from './mock.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly mockService = inject(MockService);

  getBooks(url: string, params?: any): Observable<Book[]> {
    if (params) {
      this.mockService.filter(params);
    }
    return this.mockService.books
      .asObservable()
      .pipe(map((books) => Array.from(books.values())));
  }

  createBook(url: string, data: any): Observable<Book> {
    let booksDict = this.mockService.books.value;
    booksDict = booksDict.set(data.id, data);

    this.mockService.addBook(data);
    return of(data);
  }

  // updateBook(url: string, id: number, data: any): Observable<Book[]> {
  //   this.mockService.books.value.set(id, data);
  //   return this.mockService.books
  //     .asObservable()
  //     .pipe(map((books) => Array.from(books.values())));
  // }

  // deleteBook(url: string, id: number): Observable<Book[]> {
  //   this.mockService.books.value.delete(id);
  //   return this.mockService.books
  //     .asObservable()
  //     .pipe(map((books) => Array.from(books.values())));
  // }
}
