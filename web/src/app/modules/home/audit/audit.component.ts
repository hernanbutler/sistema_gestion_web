import { HttpStatusCode } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RsAudits, RsAuditsData } from '@shared/models';
import { AuditService } from '@shared/services/audit.service';
import { DataService } from '@shared/services/data.service';
import { DialogService } from '@shared/services/dialog.service';
import { SnackbarService } from '@shared/services/snackbar.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss',
})
export class AuditComponent {
  @ViewChild(MatTable) table: MatTable<RsAuditsData>;
  displayedColumns: string[] = [
    'actividad',
    'descripcion',
    'usuarioOriginal',
    'prioridad',
    'usuarioActual',
    'fechaModificacion',
    'estado',
    'operacion',
  ];
  dataSource: MatTableDataSource<RsAuditsData> =
    new MatTableDataSource<RsAuditsData>();

  form: FormGroup = new FormGroup({
    fechaDesde: new FormControl(''),
    fechaHasta: new FormControl(''),
    usuarioOriginal: new FormControl(''),
    prioridad: new FormControl(''),
    usuarioActual: new FormControl(''),
    estado: new FormControl(''),
    operacion: new FormControl(''),
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

  operacionOption: any[] = [
    { ID: 0, name: 'CREACION' },
    { ID: 1, name: 'MODIFICACION' },
    { ID: 2, name: 'ELIMINACION' },
  ];

  usersOption: any[] = [];

  constructor(
    public _data: DataService,
    private _audit: AuditService,
    private _dialog: DialogService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getAudits();
  }

  private getAudits() {
    this._audit.audits().subscribe({
      next: (res: RsAudits) => {
        const statusCode = res.rsGenericHeaderDto.statusCode;
        if (statusCode == HttpStatusCode.Ok) {
          this._data.setAudits = res.rsGetAuditDataDto;
          this.dataSource = new MatTableDataSource<RsAuditsData>(
            this._data.getAudits
          );
          this.getUsersOption();
        } else {
          this._snackbar.openSnackBar(res.rsGenericHeaderDto);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applySearch(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  applyFilter() {
    const audits = this._data.getAudits;
    const usuarioOriginalValue = this.usuarioOriginal.value;
    const prioridadValue = this.prioridad.value;
    const usuarioActualValue = this.usuarioActual.value;
    const estadoValue = this.estado.value;
    const operacionValue = this.operacion.value;

    const filteredData = audits.filter((item: RsAuditsData) => {
      const matchFechaDesde = this.fechaDesde.value
        ? new Date(item.fechaModificacion) >= new Date(this.fechaDesde.value)
        : true;

      const matchFechaHasta = this.fechaHasta.value
        ? new Date(item.fechaModificacion) <= new Date(this.fechaHasta.value)
        : true;

      const matchUsuarioOriginal = usuarioOriginalValue.ID
        ? item.usuarioOriginal === usuarioOriginalValue.ID
        : true;

      const matchPrioridad = prioridadValue
        ? item.prioridad === prioridadValue
        : true;

      const matchUsuarioActual = usuarioActualValue.ID
        ? item.usuarioActual === usuarioActualValue.ID
        : true;

      const matchEstado = estadoValue ? item.estado === estadoValue : true;

      const matchOperacion = operacionValue
        ? item.operacion === operacionValue
        : true;

      return (
        matchFechaDesde &&
        matchFechaHasta &&
        matchUsuarioOriginal &&
        matchPrioridad &&
        matchUsuarioActual &&
        matchEstado &&
        matchOperacion
      );
    });

    this.dataSource.data = filteredData;
    this.table.renderRows();
  }

  getUsersOption(): void {
    this.usersOption = [];
    const users = this._data.getUsers;

    this._data.getAudits?.map((item: any) => {
      const user = users.find((value: any) => item.id === value.id);
      if (user) {
        this.usersOption.push({
          ID: item.id,
          name:
            user.nombres && user.apellidos
              ? user.nombres + ' ' + user.apellidos
              : user.email,
        });
      }
    });
  }

  get fechaDesde(): any {
    return this.form.get('fechaDesde');
  }

  get fechaHasta(): any {
    return this.form.get('fechaHasta');
  }

  get usuarioOriginal(): any {
    return this.form.get('usuarioOriginal');
  }

  get prioridad(): any {
    return this.form.get('prioridad');
  }

  get usuarioActual(): any {
    return this.form.get('usuarioActual');
  }

  get estado(): any {
    return this.form.get('estado');
  }

  get operacion(): any {
    return this.form.get('operacion');
  }
}
