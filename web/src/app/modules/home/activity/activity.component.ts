import { HttpStatusCode } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Estado, Operacion, Prioridad } from '@shared/enums';
import { RsActivities, RsActivitiesData } from '@shared/models';
import { ActivityService } from '@shared/services/activity.service';
import { DataService } from '@shared/services/data.service';
import { DialogService } from '@shared/services/dialog.service';
import { SnackbarService } from '@shared/services/snackbar.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent {
  @ViewChild(MatTable) table: MatTable<RsActivitiesData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
  dataSource: MatTableDataSource<RsActivitiesData> =
    new MatTableDataSource<RsActivitiesData>();

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

  constructor(
    public _data: DataService,
    private _activity: ActivityService,
    private _dialog: DialogService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getActivities();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private getActivities() {
    this._activity.activities().subscribe({
      next: (res: RsActivities) => {
        const statusCode = res.rsGenericHeaderDto.statusCode;
        if (statusCode == HttpStatusCode.Ok) {
          this._data.setActivities = res.rsGetActivityDataDto;
          this.dataSource = new MatTableDataSource<RsActivitiesData>(
            this._data.getActivities
          );
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
    const activities = this._data.getActivities;
    const usuarioOriginalValue = this.usuarioOriginal.value;
    const prioridadValue = this.prioridad.value;
    const usuarioActualValue = this.usuarioActual.value;
    const estadoValue = this.estado.value;
    const operacionValue = this.operacion.value;

    const filteredData = activities.filter((item: RsActivitiesData) => {
      const matchFechaDesde = this.fechaDesde.value
        ? new Date(item.fechaModificacion) >= new Date(this.fechaDesde.value)
        : true;

      const matchFechaHasta = this.fechaHasta.value
        ? new Date(item.fechaModificacion) <= new Date(this.fechaHasta.value)
        : true;

      const matchUsuarioOriginal = usuarioOriginalValue
        ? item.usuarioOriginal === usuarioOriginalValue
        : true;

      const matchPrioridad = prioridadValue
        ? item.prioridad === prioridadValue
        : true;

      const matchUsuarioActual = usuarioActualValue
        ? item.usuarioActual === usuarioActualValue
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

  get usersOption(): any {
    const usuarioOriginal = new Set();
    this._data.getActivities?.map((item: any) => {
      usuarioOriginal.add({
        ID: item.id,
        name: item.nombres + ' ' + item.apellidos,
      });
    });
    return usuarioOriginal;
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