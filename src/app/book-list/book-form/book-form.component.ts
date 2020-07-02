import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  // SAVE BOOK
  onSaveBook() {
    // Recover the form values
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;

    // New book and save
    const newBook = new Book(title, author);
    this.booksService.createNewBook(newBook);

    // Return to list of books
    this.router.navigate(['/books']);
  }
}
