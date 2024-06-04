import { DialogRef } from '@angular/cdk/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RsRegisterUser } from '@shared/models';
import { ActivityService } from '@shared/services/activity.service';
import { DataService } from '@shared/services/data.service';
import { SnackbarService } from '@shared/services/snackbar.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private _dialog: DialogRef,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getUsersOption();
    this.spinner.hide();
  }

  form: FormGroup = new FormGroup({
    descripcion: new FormControl(''),
    usuarioActual: new FormControl('', [Validators.required]),
    prioridad: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
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
  usersOption: any[] = [];

  onSubmit(): void {
    if (this.form.valid) {
      this.spinner.show();
      this._activity
        .create({
          descripcion: this.descripcion.value,
          usuarioActual: this.usuarioActual.value.ID,
          prioridad: this.prioridad.value,
          estado: this.estado.value,
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
