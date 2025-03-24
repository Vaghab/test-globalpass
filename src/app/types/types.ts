import { Book } from '../interfaces/Book.interface';

export type BookData = Omit<Book, 'id'>;
