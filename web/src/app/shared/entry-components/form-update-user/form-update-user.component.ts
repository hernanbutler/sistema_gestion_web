import { DialogRef } from '@angular/cdk/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '@shared/services/data.service';
import { SnackbarService } from '@shared/services/snackbar.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-form-update-user',
  templateUrl: './form-update-user.component.html',
  styleUrl: './form-update-user.component.scss',
})
export class FormUpdateUserComponent {
  constructor(
    private _data: DataService,
    private _user: UserService,
    private _snackbar: SnackbarService,
    private _dialog: DialogRef
  ) {}

  form: FormGroup = new FormGroup({
    nombres: new FormControl(this._data.getUser.nombres),
    apellidos: new FormControl(this._data.getUser.apellidos),
  });

  onSubmit(): void {
    this._user.updateUser(this.form.value).subscribe({
      next: (res: any) => {
        const statusCode = res.rsGenericHeaderDto.statusCode;
        if (statusCode == HttpStatusCode.Ok) {
          this._dialog.close();
        } else {
          this._snackbar.openSnackBar(res.rsGenericHeaderDto);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get nombres(): any {
    return this.form.get('nombres');
  }

  get apellidos(): any {
    return this.form.get('apellidos');
  }
}
