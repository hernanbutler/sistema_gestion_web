import { HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormCreateUserComponent } from '@shared/entry-components/form-create-user/form-create-user.component';
import { RsUsers, RsUsersData } from '@shared/models/rs-users.model';
import { DataService } from '@shared/services/data.service';
import { DialogService } from '@shared/services/dialog.service';
import { SnackbarService } from '@shared/services/snackbar.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<RsUsersData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'email',
    'nombres',
    'apellidos',
    'estado',
    'rol',
  ];
  dataSource: MatTableDataSource<RsUsersData> =
    new MatTableDataSource<RsUsersData>();

  form: FormGroup = new FormGroup({
    estado: new FormControl(''),
    rol: new FormControl(''),
  });

  estadoOption: any[] = [
    { ID: 1, name: 'Activo' },
    { ID: 0, name: 'Inactivo' },
  ];

  rolOption: any[] = [
    { ID: 1, name: 'EJECUTOR' },
    { ID: 0, name: 'ADMINISTRADOR' },
  ];

  constructor(
    private _data: DataService,
    private _user: UserService,
    private _dialog: DialogService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private getUsers() {
    this._user.users().subscribe({
      next: (res: RsUsers) => {
        const statusCode = res.rsGenericHeaderDto.statusCode;
        if (statusCode == HttpStatusCode.Ok) {
          this._data.setUsers = res.rsUsersDataDto;
          this.dataSource = new MatTableDataSource<RsUsersData>(
            this._data.getUsers
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
    const users = this._data.getUsers;
    const estadoValue = this.estado.value;
    const rolValue = this.rol.value;

    const filteredData = users.filter((item: RsUsersData) => {
      const matchEstado =
        estadoValue === 0 || estadoValue === 1
          ? item.estado === estadoValue
          : true;
      const matchRol = rolValue ? item.rol === rolValue : true;

      return matchEstado && matchRol;
    });

    this.dataSource.data = filteredData;
    this.table.renderRows();
  }

  createUser(): void {
    this._dialog
      .openDialog(FormCreateUserComponent)
      .afterClosed()
      .subscribe(() => {
        this.getUsers();
      });
  }

  get estado(): any {
    return this.form.get('estado');
  }

  get rol(): any {
    return this.form.get('rol');
  }
}
