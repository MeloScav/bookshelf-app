import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  // Local array of Book objects
  books: Book[] = [];
  // Subject : emit array
  booksSubject = new Subject<Book[]>();

  constructor() {}

  // EMIT
  emitBooks() {
    this.booksSubject.next(this.books);
  }
}
