import { DialogRef } from '@angular/cdk/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RsRegisterUser } from '@shared/models';
import { ActivityService } from '@shared/services/activity.service';
import { DataService } from '@shared/services/data.service';
import { SnackbarService } from '@shared/services/snackbar.service';

@Component({
  selector: 'app-form-create-activity',
  templateUrl: './form-create-activity.component.html',
  styleUrl: './form-create-activity.component.scss',
})
export class FormCreateActivityComponent implements OnInit {
  constructor(
    public _data: DataService,
    private _activity: ActivityService,
    private _snackbar: SnackbarService,
    private _dialog: DialogRef
  ) {}

  ngOnInit(): void {
    this.getUsersOption();
  }

  form: FormGroup = new FormGroup({
    descripcion: new FormControl(''),
    prioridad: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    usuarioActual: new FormControl('', [Validators.required]),

  });

  prioridadOption: any[] = [
    { ID: 0, name: 'Alta' },
    { ID: 1, name: 'Media' },
    { ID: 2, name: 'Baja' },
  ];

  estadoOption: any[] = [
    { ID: 0, name: 'Pendiente' },
    { ID: 1, name: 'Finalizado' },
    { ID: 2, name: 'Eliminado' },
  ];

  usersOption: any[] = [];

  onSubmit(): void {
    if (this.form.valid) {
      this._activity
        .create({
        descripcion: this.descripcion.value,
        prioridad: this.prioridad.value.toUpperCase(),
        estado: this.estado.value.toUpperCase(),
        usuarioActual: this.usuarioActual.value.ID,
        })
        .subscribe({
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

  getUsersOption(): any {
    this._data.getUsers?.map((item: any) => {
      this.usersOption.push({
        ID: item.id,
        name: item.nombres ? item.nombres + ' ' + item.apellidos : item.email,
      });
    });

    return this.usersOption;
  }

  get descripcion(): any {
    return this.form.get('descripcion');
  }

  get prioridad(): any {
    return this.form.get('prioridad');
  }

  get estado(): any {
    return this.form.get('estado');
  }

  get usuarioActual(): any {
    return this.form.get('usuarioActual');
  }
}
