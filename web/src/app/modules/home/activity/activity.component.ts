import { HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormCreateActivityComponent } from '@shared/entry-components/form-create-activity/form-create-activity.component';
import { RsActivitiesData, RsActivities } from '@shared/models';
import { ActivityService } from '@shared/services/activity.service';
import { DataService } from '@shared/services/data.service';
import { DialogService } from '@shared/services/dialog.service';
import { SnackbarService } from '@shared/services/snackbar.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<RsActivitiesData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'actividad',
    'descripcion',
    'prioridad',
    'fechaModificacion',
    'estado',
    'usuarioOriginal',
    'usuarioActual',
    'actions',
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
  usuarioOriginalOption: any[] = [];
  usuarioActualOption: any[] = [];

  constructor(
    private _data: DataService,
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
          this._data.setActivities = res.rsActivitiesDataDto;
          this.dataSource = new MatTableDataSource<RsActivitiesData>(
            this._data.getActivities
          );
          this.getUsuarioActualOption();
          this.getUsuarioOriginalOption();
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
    const usuarioOriginalValue = this.usuarioOriginal.value.ID;
    const prioridadValue = this.prioridad.value;
    const usuarioActualValue = this.usuarioActual.value.ID;
    const estadoValue = this.estado.value;

    const filteredData = activities.filter((item: RsActivitiesData) => {
      const matchFechaDesde = this.fechaDesde.value
        ? new Date(item.fechaModificacion) >= new Date(this.fechaDesde.value)
        : true;

      const matchFechaHasta = this.fechaHasta.value
        ? new Date(item.fechaModificacion) <= new Date(this.fechaHasta.value)
        : true;

      const matchUsuarioOriginal = usuarioOriginalValue
        ? item.usuarioOriginal.id === usuarioOriginalValue
        : true;

      const matchPrioridad = prioridadValue
        ? item.prioridad === prioridadValue
        : true;

      const matchUsuarioActual = usuarioActualValue
        ? item.usuarioActual.id === usuarioActualValue
        : true;

      const matchEstado = estadoValue ? item.estado === estadoValue : true;

      return (
        matchFechaDesde &&
        matchFechaHasta &&
        matchUsuarioOriginal &&
        matchPrioridad &&
        matchUsuarioActual &&
        matchEstado
      );
    });

    this.dataSource.data = filteredData;
    this.table.renderRows();
  }

  createActivity(): void {
    this._dialog
      .openDialog(FormCreateActivityComponent)
      .afterClosed()
      .subscribe(() => {
        this.getActivities();
      });
  }

  onEdit(activity: any) {
    console.log(activity);
  }

  onRemove(activity_id: number) {
    console.log(activity_id);
  }

  getUsuarioOriginalOption(): any {
    const uniqueIDs = new Set();

    this._data.getActivities?.forEach((item: any) => {
      const usuarioOriginal = {
        ID: item.usuarioOriginal.id,
        name:
          item.usuarioOriginal.nombres + ' ' + item.usuarioOriginal.apellidos,
      };

      if (!uniqueIDs.has(usuarioOriginal.ID)) {
        uniqueIDs.add(usuarioOriginal.ID);
        this.usuarioOriginalOption.push(usuarioOriginal);
      }
    });
  }

  getUsuarioActualOption(): any {
    const uniqueIDs = new Set();

    this._data.getActivities?.forEach((item: any) => {
      const usuarioActual = {
        ID: item.usuarioActual.id,
        name: item.usuarioActual.nombres + ' ' + item.usuarioActual.apellidos,
      };

      if (!uniqueIDs.has(usuarioActual.ID)) {
        uniqueIDs.add(usuarioActual.ID);
        this.usuarioActualOption.push(usuarioActual);
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
}
