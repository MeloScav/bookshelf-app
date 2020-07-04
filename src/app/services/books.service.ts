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

  // NEW BOOK
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  // REMOVE BOOK
  removeBook(book: Book) {
    // Retrieve the index
    const bookIndexToRemove = this.books.findIndex((element) => {
      if (element === book) {
        return true;
      }
    });
    // Remove from this index
    this.books.splice(bookIndexToRemove, 1);
    // Save the array
    this.saveBooks();
    // Emit
    this.emitBooks();
  }

  // UPLOAD FILE
  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      // ref() only => reference to the root of the storage
      // child() => create a child images folder
      // put(file) => save file in folder
      const upload = firebase
        .storage()
        .ref()
        .child('images/' + almostUniqueFileName + file.name)
        .put(file);

      // React to each change of download status
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        // Follow the download
        () => {
          console.log('Chargement...');
        },
        // Error
        (error) => {
          console.log('Erreur de chargement: ' + error);
          reject();
        },
        // Complete
        () => {
          // URL image in storage to save in database and display
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    });
  }
}
