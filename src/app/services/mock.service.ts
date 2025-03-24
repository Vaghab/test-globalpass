import { BehaviorSubject, map } from 'rxjs';

import { Injectable } from '@angular/core';

import { Genres } from '../constans/Genres';
import { Languages } from '../constans/Language';
import { Book } from '../interfaces/Book.interface';
import { Params } from '../interfaces/Params.interface';

const books = new Map<number, Book>([
  [
    1,
    {
      id: 1,
      title: 'The Lord of the Rings',
      author: 'JRR Tolkien',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      pages: 1000,
      language: Languages.EN,
      genre: Genres.FANTASY,
    },
  ],
  [
    2,
    {
      id: 2,
      title: 'Война и мир',
      author: 'Л Н Толстой',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      pages: 500,
      language: Languages.RU,
      genre: Genres.HISTORY,
    },
  ],
  [
    3,
    {
      id: 3,
      title: 'The Return of the King',
      author: 'JRR Tolkien',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      pages: 500,
      language: Languages.EN,
      genre: Genres.FANTASY,
    },
  ],
  [
    4,
    {
      id: 4,
      title: 'The Hobbit',
      author: 'JRR Tolkien',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      pages: 500,
      language: Languages.EN,
      genre: Genres.FANTASY,
    },
  ],
  [
    5,
    {
      id: 5,
      title: 'Two Towers',
      author: 'JRR Tolkien',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      pages: 500,
      language: Languages.EN,
      genre: Genres.FANTASY,
    },
  ],
  [
    6,
    {
      id: 6,
      title: 'The Fellowship of the Ring',
      author: 'JRR Tolkien',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      pages: 500,
      language: Languages.EN,
      genre: Genres.FANTASY,
    },
  ],
]);

@Injectable({
  providedIn: 'root',
})
export class MockService {
  readonly books = new BehaviorSubject(books);

  filter(params: Params) {
    let filteredBooks = Array.from(this.books.value.values()).filter(
      (book: Book) => {
        // Если параметры не заданы, считаем, что книга подходит

        if (
          (!params.author || params.author.length === 0) &&
          !params.tittle &&
          (!params.range || (params.range[0] === 0 && params.range[1] === 0)) &&
          (!params.genre || params.genre.length === 0) &&
          (!params.language || params.language.length === 0)
        ) {
          return true;
        }

        let matches = false;

        // Проверка по автору
        if (params.author && params.author.includes(book.author)) {
          matches = true;
        }

        // Проверка по названию (title)
        if (
          (params.tittle &&
            book.title.toLowerCase().includes(params.tittle.toLowerCase())) ||
          (params.tittle &&
            book.description
              .toLowerCase()
              .includes(params.tittle.toLowerCase()))
        ) {
          matches = true;
        }

        // Проверка по диапазону страниц
        if (params.range) {
          const [minPages, maxPages] = params.range;
          if (book.pages >= minPages && book.pages <= maxPages) {
            matches = true;
          }
        }

        // Проверка по жанру
        if (params.genre && params.genre.includes(book.genre)) {
          matches = true;
        }

        // Проверка по языку
        if (params.language && params.language.includes(book.language)) {
          matches = true;
        }

        return matches; // Возвращаем true, если хотя бы один параметр совпал
      }
    );

    // Преобразование массива обратно в Map
    const filteredBooksMap = new Map<number, Book>();
    filteredBooks.forEach((book) => {
      filteredBooksMap.set(book.id, book);
    });

    this.books.next(filteredBooksMap);
  }

  getAuthors() {
    const booksArray = Array.from(books.values());
    return [...new Set(booksArray.map((book) => book.author))];
  }

  getLanguages() {
    const booksArray = Array.from(books.values());
    return [...new Set(booksArray.map((book) => book.language))];
  }

  getGenres() {
    const booksArray = Array.from(books.values());
    return [...new Set(booksArray.map((book) => book.genre))];
  }
}
