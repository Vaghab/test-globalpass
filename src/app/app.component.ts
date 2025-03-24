import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BookListComponent } from './book-list/book-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'test-globalpass';
}
