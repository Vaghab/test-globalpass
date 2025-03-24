import { DataViewModule } from 'primeng/dataview';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';
import { tap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from '../Card-component/card-component';
import { Book } from '../interfaces/Book.interface';
import { BookService } from '../services/BookService.service';

@Component({
  selector: 'app-List-component',
  templateUrl: './List-component.component.html',
  styleUrls: ['./List-component.component.scss'],
  standalone: true,
  imports: [DataViewModule, AsyncPipe, TagModule, FormsModule],
  providers: [DialogService, DynamicDialogRef],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private readonly bookService = inject(BookService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(DynamicDialogRef);
  private readonly dialogService = inject(DialogService);

  readonly bookSignal$ = this.bookService.find().pipe(tap(console.log));

  public viewBook(book: Book) {
    this.dialogService.open(CardComponent, {
      header: book.author,
      data: book,
      dismissableMask: true,
    });
  }
}
