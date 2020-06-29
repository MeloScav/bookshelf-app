import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // Local variable : authentification status
  isAuth: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Activated when authentification status changes
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // If user is detected
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }
}
