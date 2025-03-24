import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Book } from '../interfaces/Book.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card-component.html',
  styleUrls: ['./card-component.scss'],
  standalone: true,
  imports: [DialogModule, FormsModule, TagModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() book: Book | null = null;

  readonly config = inject(DynamicDialogConfig);
}
