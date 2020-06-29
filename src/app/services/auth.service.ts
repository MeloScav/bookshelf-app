import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Create a new user
  // Asynchronous method
  createNewUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  // SIGN IN
  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  // SIGN OUT
  signOutUser() {
    firebase.auth().signOut();
  }
}
