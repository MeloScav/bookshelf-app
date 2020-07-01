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

  // GET BOOKS
  getBooks() {
    // on => react to changes to the database
    // on => observe "value"
    // val() => value of data returned by the server
    firebase
      .database()
      .ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }

  // SINGLE BOOK
  getSingleBook(id: number) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('/books/' + id)
        .once('value')
        .then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
