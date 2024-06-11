import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormCreateActivityComponent } from '@shared/entry-components/form-create-activity/form-create-activity.component';
import { FormDeleteActivityComponent } from '@shared/entry-components/form-delete-activity/form-delete-activity.component';
import { FormUpdateActivityComponent } from '@shared/entry-components/form-update-activity/form-update-activity.component';
import { FormViewActivityComponent } from '@shared/entry-components/form-view-activity/form-view-activity.component';
import { RsActivitiesData, RsActivities } from '@shared/models';
import { ActivityService } from '@shared/services/activity.service';
import { DataService } from '@shared/services/data.service';
import { DialogService } from '@shared/services/dialog.service';
import { SnackbarService } from '@shared/services/snackbar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '@shared/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<RsActivitiesData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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

  currentUser: boolean = false;
  isProfiledCompleted: boolean = true;
  userId: any;
  avatar: any = 'assets/images/avatar-default.png';

  user = {
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    estado: 0,
  };
  
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
  usuarioOriginalOption: any[] = [];
  usuarioActualOption: any[] = [];

  constructor(
    private _user: UserService,
    public _data: DataService,
    private _activity: ActivityService,
    private _dialog: DialogService,
    private _snackbar: SnackbarService,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,

  ) {
    this.isAdmin = this._data.getUser.rol === 'ADMINISTRADOR';
    this.avatar = this._data.getAvatar;
  }

  ngOnInit(): void {
    this.getActivities();
  }

  private getActivities() {
    this.spinner.show();
<<<<<<< HEAD
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
          const activityID = Number(sessionStorage.getItem('activity'));
          if (activityID) {
            this.usuarioActual.setValue(activityID);
            sessionStorage.removeItem('activity');
          }
          this.applyFilter();
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
    this._activity.activities().subscribe((res: RsActivities) => {
      const statusCode = res.rsGenericHeaderDto.statusCode;
      if (statusCode == HttpStatusCode.Ok) {
        this._data.setActivities = res.rsActivitiesDataDto;
        this.dataSource = new MatTableDataSource<RsActivitiesData>(
          this._data.getActivities
        );
        this.getUsuarioActualOption();
        this.getUsuarioOriginalOption();
        const activityID = Number(sessionStorage.getItem('activity'));
        if (activityID) {
          this.usuarioActual.setValue(activityID);
          sessionStorage.removeItem('activity');
        }
        this.applyFilter();
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
  
  private getUser() {
    this.spinner.show();
    this._user.user(this.userId).subscribe((res: any) => {
      const statusCode = res.rsGenericHeaderDto.statusCode;
      if (statusCode == HttpStatusCode.Ok) {
        this.setData(res.rsUserDataDto);
        if (this.currentUser) {
          this._data.setUser = res.rsUserDataDto;
          this.isProfiledCompleted = true;
        }
        if (res.rsUserDataDto.image) {
          this._user.getImage(res.rsUserDataDto.image).subscribe((res: any) => {
            let objectURL = URL.createObjectURL(res);
            this.avatar = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
        }
      } else {
        this._snackbar.openSnackBar(res.rsGenericHeaderDto);
      }
    });
    this.spinner.hide();
  }

  private setData(data: any): void {
    this.user.nombre = data.nombres;
    this.user.apellido = data.apellidos;
    this.user.email = data.email;
    this.user.rol = data.rol;
    this.user.estado = data.estado;
  }


  uploadImage(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    this._user.upload(this.userId, formData).subscribe(() => {
      this.getUser();
    });
  }

  applySearch(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  applyFilter() {
    const activities = this._data.getActivities;
    const usuarioOriginalValue = this.usuarioOriginal.value.ID;
    const prioridadValue = this.prioridad.value;
    const usuarioActualValue =
      this.usuarioActual.value.ID ?? this.usuarioActual.value;
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
        ? item.usuarioActual.id == usuarioActualValue
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

  onView(activity: any): void {
    this._dialog.openDialog(FormViewActivityComponent, activity);
  }

  onEdit(activity: any): void {
    this._dialog
      .openDialog(FormUpdateActivityComponent, activity)
      .afterClosed()
      .subscribe(() => {
        this.getActivities();
      });
  }

  onRemove(activity_id: number): void {
    this._dialog
      .openDialog(FormDeleteActivityComponent, { id: activity_id })
      .afterClosed()
      .subscribe(() => {
        this.getActivities();
      });
  }

  getUsuarioOriginalOption(): any {
    this.usuarioOriginalOption = [];
    const uniqueIDs = new Set();

    this._data.getActivities?.forEach((item: any) => {
      const usuarioOriginal = {
        ID: item.usuarioOriginal.id,
        name:
          item.usuarioOriginal.nombres && item.usuarioOriginal.apellidos
            ? item.usuarioOriginal.nombres +
              ' ' +
              item.usuarioOriginal.apellidos
            : item.usuarioOriginal.email,
      };

      if (!uniqueIDs.has(usuarioOriginal.ID)) {
        uniqueIDs.add(usuarioOriginal.ID);
        this.usuarioOriginalOption.push(usuarioOriginal);
      }
    });
  }

  getUsuarioActualOption(): any {
    this.usuarioActualOption = [];
    const uniqueIDs = new Set();

    this._data.getActivities?.forEach((item: any) => {
      const usuarioActual = {
        ID: item.usuarioActual.id,
        name:
          item.usuarioActual.nombres && item.usuarioActual.apellidos
            ? item.usuarioActual.nombres + ' ' + item.usuarioActual.apellidos
            : item.usuarioActual.email,
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
