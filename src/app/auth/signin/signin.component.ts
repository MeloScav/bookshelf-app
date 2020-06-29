import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  // FORM
  signInForm: FormGroup;
  // If error
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Form initialization
    this.initForm();
  }

  // Form initialization
  initForm() {
    // Password: min 6 characters
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
    });
  }

  // Submit
  onSubmit() {
    // Recovery of values
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    // Sign in
    this.authService.signInUser(email, password).then(
      () => {
        //  If successful: refer to books
        this.router.navigate(['/books']);
      },
      (error) => {
        // If error: display the error message
        this.errorMessage = error;
      }
    );
  }
}
