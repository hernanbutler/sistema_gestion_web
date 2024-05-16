import { DialogRef } from '@angular/cdk/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RsRegisterUser } from '@shared/models';
import { AuthService } from '@shared/services/auth.service';
import { SnackbarService } from '@shared/services/snackbar.service';

@Component({
  selector: 'app-form-create-user',
  templateUrl: './form-create-user.component.html',
  styleUrl: './form-create-user.component.scss',
})
export class FormCreateUserComponent {
  constructor(
    private _auth: AuthService,
    private _snackbar: SnackbarService,
    private _dialog: DialogRef
  ) {}

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.form.valid) {
      this._auth.register(this.form.value).subscribe({
        next: (res: RsRegisterUser) => {
          const statusCode = res.rsGenericHeaderDto.statusCode;
          if (statusCode == HttpStatusCode.Created) {
            this._dialog.close();
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

  get rol(): any {
    return this.form.get('rol');
  }
}
