import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^\\+?[0-9]{10,12}$')],
        ],
        accountNumber: ['', [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        accountType: ['', [Validators.required]],
      },
      { validator: this.passwordvalidator }
    );
  }

  passwordvalidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notMatch: true };
  }

  onSubmit() {
    console.log('hi');
    if (this.signupForm.valid) {
      console.log('Form submitted', this.signupForm.value);
      const formValues = this.signupForm.value.accountNumber;
      this.userService.checkAccountNumber(formValues).subscribe({
        next: (accountnumber: User[]) => {
          if (accountnumber && accountnumber.length > 0) {
            console.log('accounnumber already exisiting');
          } else {
            this.userService
              .insertUser(this.signupForm.value)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (user) => {
                  this.router.navigate(['/login']), console.log(user);
                },
                error: (error) => console.log(error),
              });
          }
        },
      });
      // Implement the logic to handle signup (e.g., call the backend API)
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
