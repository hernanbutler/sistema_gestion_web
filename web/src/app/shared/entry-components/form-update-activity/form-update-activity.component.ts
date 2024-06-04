import { DialogRef } from '@angular/cdk/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityService } from '@shared/services/activity.service';
import { DataService } from '@shared/services/data.service';
import { SnackbarService } from '@shared/services/snackbar.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-update-activity',
  templateUrl: './form-update-activity.component.html',
  styleUrl: './form-update-activity.component.scss',
})
export class FormUpdateActivityComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _data: DataService,
    private _activity: ActivityService,
    private _snackbar: SnackbarService,
    private _dialog: DialogRef,
    private spinner: NgxSpinnerService
  ) {
    this.isAdmin = this._data.getUser.rol === 'ADMINISTRADOR';
  }

  form: FormGroup = new FormGroup({
    descripcion: new FormControl(this.data.descripcion),
    usuarioActual: new FormControl(
      `${this.data.usuarioActual.nombres} ${this.data.usuarioActual.apellidos}`,
      [Validators.required]
    ),
    prioridad: new FormControl(this.data.prioridad, [Validators.required]),
    estado: new FormControl(this.data.estado, [Validators.required]),
  });

  prioridadOption: any[] = [
    { ID: 0, name: 'ALTA' },
    { ID: 1, name: 'MEDIA' },
    { ID: 2, name: 'BAJA' },
  ];

  estadoOption: any[] = [
    { ID: 0, name: 'PENDIENTE' },
    { ID: 1, name: 'FINALIZADO' },
    { ID: 2, name: 'ELIMINADO' },
  ];
  isAdmin: boolean;
  usersOption: any[] = [];

  ngOnInit(): void {
    this.spinner.show();
    this.getUsersOption();

    if (!this.isAdmin) {
      this.descripcion.disable();
      this.usuarioActual.disable();
      this.prioridad.disable();
    }
    this.spinner.hide();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.spinner.show();
      this._activity
        .update(this.data.id, {
          descripcion: this.descripcion.value,
          usuarioActual:
            typeof this.usuarioActual.value !== 'string'
              ? this.usuarioActual.value
              : this.data.usuarioActual.id,
          prioridad: this.prioridad.value,
          estado: this.estado.value,
        })
        .subscribe((res: any) => {
          const statusCode = res.rsGenericHeaderDto.statusCode;
          if (statusCode == HttpStatusCode.Ok) {
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

  get usuarioActual(): any {
    return this.form.get('usuarioActual');
  }

  get prioridad(): any {
    return this.form.get('prioridad');
  }

  get estado(): any {
    return this.form.get('estado');
  }
}
