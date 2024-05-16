import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RsLoginUser } from '@shared/models';
import { AuthService } from '@shared/services/auth.service';
import { DataService } from '@shared/services/data.service';
import { SnackbarService } from '@shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _data: DataService,
    private _snackbar: SnackbarService
  ) {}

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.form.valid) {
      this._auth.login(this.form.value).subscribe({
        next: (res: RsLoginUser) => {
          const statusCode = res.rsGenericHeaderDto.statusCode;
          if (statusCode == HttpStatusCode.Ok) {
            const token = res.rsLoginUserDataDto.token;
            sessionStorage.setItem('token', token);
            this._data.setUser = new JwtHelperService().decodeToken(
              token
            ).payload;
            this._router.navigate(['/home/profile/' + this._data.getUser.id]);
          } else {
            this._snackbar.openSnackBar(res.rsGenericHeaderDto);
          }
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
