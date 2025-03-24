import { MockService } from './../services/mock.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Params } from '../interfaces/Params.interface';
import { BookService } from '../services/BookService.service';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss'],
  standalone: true,
  imports: [
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    AutoCompleteModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  private readonly mockService = inject(MockService);
  private readonly bookService = inject(BookService);

  readonly sortAuthors = this.mockService.getAuthors();
  readonly sortLanguages = this.mockService.getLanguages();
  readonly sortGenres = this.mockService.getGenres();

  public readonly filterForm = new FormGroup<{
    search: FormControl<string | null>;
    sortAuthors: FormControl<string[] | null>;
    sortLanguages: FormControl<string[] | null>;
    minPages: FormControl<number>;
    maxPages: FormControl<number>;
    sortGenres: FormControl<string[] | null>;
  }>({
    search: new FormControl(''),
    sortAuthors: new FormControl([]),
    sortLanguages: new FormControl([]),
    minPages: new FormControl(0, { nonNullable: true }),
    maxPages: new FormControl(0, { nonNullable: true }),
    sortGenres: new FormControl([]),
  });

  refreshFilter() {
    let params: Params = {
      author: this.filterForm.value.sortAuthors,
      tittle: this.filterForm.value.search,
      range: [
        this.filterForm.value.minPages ?? 0,
        this.filterForm.value.maxPages ?? 0,
      ],
      genre: this.filterForm.value.sortGenres,
      language: this.filterForm.value.sortLanguages,
    };

    this.bookService.find(params);
  }
}
