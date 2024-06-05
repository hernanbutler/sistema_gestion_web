import { HttpStatusCode } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RsAudits, RsAuditsData } from '@shared/models';
import { AuditService } from '@shared/services/audit.service';
import { DataService } from '@shared/services/data.service';
import { SnackbarService } from '@shared/services/snackbar.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss',
})
export class AuditComponent {
  @ViewChild(MatTable) table: MatTable<RsAuditsData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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
    actividad: new FormControl(''),
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

  actividadOption: any[] = [];
  usersOption: any[] = [];

  constructor(
    public _data: DataService,
    private _audit: AuditService,
    private _snackbar: SnackbarService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAudits();
  }

  private getAudits() {
    this.spinner.show();
<<<<<<< HEAD
    this._audit.audits().subscribe({
      next: (res: RsAudits) => {
        const statusCode = res.rsGenericHeaderDto.statusCode;
        if (statusCode == HttpStatusCode.Ok) {
          this._data.setAudits = res.rsGetAuditDataDto;
          this.dataSource = new MatTableDataSource<RsAuditsData>(
            this._data.getAudits
          );
          this.getAuditsOption();
          this.getUsersOption();
        } else {
          this._snackbar.openSnackBar(res.rsGenericHeaderDto);
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
=======
    this._audit.audits().subscribe((res: RsAudits) => {
      const statusCode = res.rsGenericHeaderDto.statusCode;
      if (statusCode == HttpStatusCode.Ok) {
        this._data.setAudits = res.rsGetAuditDataDto;
        this.dataSource = new MatTableDataSource<RsAuditsData>(
          this._data.getAudits
        );
        this.getAuditsOption();
        this.getUsersOption();
      } else {
        this._snackbar.openSnackBar(res.rsGenericHeaderDto);
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
>>>>>>> origin/master
    });
    this.spinner.hide();
  }

  applySearch(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  applyFilter() {
    const audits = this._data.getAudits;
    const actividadValue = this.actividad.value;
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

      const matchActividad = actividadValue
        ? item.actividad === actividadValue
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
        matchActividad &&
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

  getAuditsOption(): void {
    this.actividadOption = [];
    const uniqueIDs = new Set();

    this._data.getAudits?.forEach((item: any) => {
      if (!uniqueIDs.has(item.actividad)) {
        uniqueIDs.add(item.actividad);
        this.actividadOption.push({ ID: item.actividad, name: item.actividad });
      }
    });
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

  get actividad(): any {
    return this.form.get('actividad');
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
