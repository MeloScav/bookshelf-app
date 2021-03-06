import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  // FORM
  signUpForm: FormGroup;
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
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
    });
  }

  // Submit form
  onSubmit() {
    // Recovery of values
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    // Create new user
    this.authService.createNewUser(email, password).then(
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
