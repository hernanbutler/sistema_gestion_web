import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RsLoginUser } from '@shared/models';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private _router: Router, private _auth: AuthService) {}

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.form.valid) {
      this._auth.login(this.form.value).subscribe({
        next: (res: RsLoginUser) => {
          localStorage.setItem('token', res.rsLoginUserDataDto.token);
          this._router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }
}
