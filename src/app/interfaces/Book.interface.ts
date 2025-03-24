import { Genres } from '../constans/Genres';
import { Languages } from '../constans/Language';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  pages: number;
  language: Languages;
  genre: Genres;
}
