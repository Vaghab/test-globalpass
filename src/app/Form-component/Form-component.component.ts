import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Genres } from '../constans/Genres';
import { Languages } from '../constans/Language';
import { Book } from '../interfaces/Book.interface';
import { MockService } from '../services/mock.service';

@Component({
  selector: 'app-form',
  templateUrl: './Form-component.component.html',
  styleUrls: ['./Form-component.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
  ],
})
export class FormComponent {
  private readonly mockService = inject(MockService);
  private readonly ref = inject(DynamicDialogRef);
  private readonly dynamicDialogConfig = inject(
    DynamicDialogConfig<{ books: Book[] }>
  );

  readonly authors = this.mockService.getAuthors().map((author) => ({
    name: author,
  }));
  readonly languages = this.mockService.getLanguages().map((language) => ({
    name: language,
  }));

  public readonly newBookForm = new FormGroup<{
    title: FormControl<string>;
    author: FormControl<{ name: string }>;
    genre: FormControl<Genres>;
    language: FormControl<Languages>;
    pages: FormControl<number>;
    description: FormControl<string>;
  }>({
    title: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    author: new FormControl(this.authors[0], {
      validators: Validators.required,
      nonNullable: true,
    }),
    genre: new FormControl(Genres.FANTASY, {
      validators: Validators.required,
      nonNullable: true,
    }),
    language: new FormControl(Languages.EN, {
      validators: Validators.required,
      nonNullable: true,
    }),
    pages: new FormControl(0, {
      validators: Validators.required,
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  public addBook() {
    const newBook: Book = {
      ...this.newBookForm.getRawValue(),
      id: this.dynamicDialogConfig.data.books.length + 1,
      language: this.newBookForm.controls.language.value,
      author: this.newBookForm.controls.author.value.name,
    };
    this.closeDialog(newBook);
  }

  closeDialog(book?: Book) {
    this.ref.close(book);
  }
}
