import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onloginFormSubmit() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.authenticationService
        .userAuthentication(this.loginForm.value)
        .subscribe({
          next: (user) => {
            if (user && user.length > 0) {
              console.log(user);
              this.router.navigate(['/dashboared']);
              localStorage.setItem('user', JSON.stringify(user));
            } else {
              console.log('login failed');
            }
          },
        });
    }
  }
}
