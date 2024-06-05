import { DialogRef } from '@angular/cdk/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RsRegisterUser } from '@shared/models';
import { SnackbarService } from '@shared/services/snackbar.service';
import { UserService } from '@shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-create-user',
  templateUrl: './form-create-user.component.html',
  styleUrl: './form-create-user.component.scss',
})
export class FormCreateUserComponent {
  constructor(
    private _user: UserService,
    private _snackbar: SnackbarService,
    private _dialog: DialogRef,
    private spinner: NgxSpinnerService
  ) {}

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
  });

  rolOption: any[] = [
    { ID: 0, name: 'Administrador' },
    { ID: 1, name: 'Ejecutor' },
  ];

  onSubmit(): void {
    if (this.form.valid) {
      this.spinner.show();
      this._user
        .register({
          email: this.email.value,
          password: this.password.value,
          rol: this.rol.value.toUpperCase(),
        })
        .subscribe((res: RsRegisterUser) => {
          const statusCode = res.rsGenericHeaderDto.statusCode;
          if (statusCode == HttpStatusCode.Created) {
            this._dialog.close();
          } else {
            this._snackbar.openSnackBar(res.rsGenericHeaderDto);
          }
          this.spinner.hide();
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
