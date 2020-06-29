import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        // Return a user
        (user) => {
          if (user) {
            // If user : user can pass
            resolve(true);
          } else {
            // We redirect
            this.router.navigate(['/auth', 'signin']);
            // user can't pass
            resolve(false);
          }
        }
      );
    });
  }
}
