import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

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

  // SAVE BOOKS
  saveBooks() {
    // ref => returns a reference to a node in database
    // set => save array to "/books", replace if exists
    firebase.database().ref('/books').set(this.books);
  }
}
