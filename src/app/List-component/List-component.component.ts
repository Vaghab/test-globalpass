import { DataViewModule } from 'primeng/dataview';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from '../Card-component/card-component';
import { Book } from '../interfaces/Book.interface';

@Component({
  selector: 'app-List-component',
  templateUrl: './List-component.component.html',
  styleUrls: ['./List-component.component.scss'],
  standalone: true,
  imports: [DataViewModule, TagModule, FormsModule],
  providers: [DialogService, DynamicDialogRef],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private readonly dialogService = inject(DialogService);

  readonly books = input<Book[]>();

  public viewBook(book: Book) {
    this.dialogService.open(CardComponent, {
      header: book.author,
      data: book,
      dismissableMask: true,
    });
  }
}
