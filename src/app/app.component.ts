import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: 'AIzaSyBtXRPwRZ4ctO40YXQ3l-a7Ttvai9QGKwY',
      authDomain: 'bookshelf-2f209.firebaseapp.com',
      databaseURL: 'https://bookshelf-2f209.firebaseio.com',
      projectId: 'bookshelf-2f209',
      storageBucket: 'bookshelf-2f209.appspot.com',
      messagingSenderId: '189710992428',
      appId: '1:189710992428:web:1f2d4528da072f4f647d89',
      measurementId: 'G-8PNC32MEYN',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
