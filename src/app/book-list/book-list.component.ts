import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, tap } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { FilterComponent } from '../Filter-component/filter-component.component';
import { FormComponent } from '../Form-component/Form-component.component';
import { Book } from '../interfaces/Book.interface';
import { ListComponent } from '../List-component/List-component.component';
import { BookService } from '../services/BookService.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  imports: [ButtonModule, DialogModule, ListComponent, FilterComponent],
  providers: [DialogService, DynamicDialogRef],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
  private readonly dialogService = inject(DialogService);
  private readonly bookService = inject(BookService);
  private readonly destroyed = inject(DestroyRef);

  readonly books = toSignal(this.bookService.find());

  public createBook() {
    this.dialogService
      .open(FormComponent, {
        header: 'Добавить книгу',
        //data для создания id книги в зависимости и от количества книг
        data: {
          books: this.books(),
        },
      })
      .onClose.pipe(
        filter(Boolean),
        tap((book: Book) => {
          this.bookService.create(book);
        }),
        takeUntilDestroyed(this.destroyed)
      )
      .subscribe();
  }
}
