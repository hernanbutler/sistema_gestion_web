import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormUpdateUserComponent } from '@shared/entry-components/form-update-user/form-update-user.component';
import { RsUser } from '@shared/models';
import { DataService } from '@shared/services/data.service';
import { DialogService } from '@shared/services/dialog.service';
import { SnackbarService } from '@shared/services/snackbar.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(
    private _user: UserService,
    public _data: DataService,
    private _dialog: DialogService,
    private _snackbar: SnackbarService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.isAdmin = this._data.getUser.rol === 'ADMINISTRADOR';
  }

  currentUser: boolean = false;
  isAdmin: boolean;
  isProfiledCompleted: boolean = true;
  userId: any;

  user = {
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    estado: 0,
  };

  estadoOption: any[] = [
    { ID: 0, name: 'Inactivo' },
    { ID: 1, name: 'Activo' },
  ];

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      const rol_ejecutor = this._data.getUser.rol == 'EJECUTOR';
      this.currentUser = this.userId == this._data.getUser.id;
      if (rol_ejecutor && !this.currentUser) {
        this._router.navigate(['/home/profile/' + this._data.getUser.id]);
      }
      this.getUser();
    });
  }

  private getUser() {
    this._user.user(this.userId).subscribe((res: RsUser) => {
      const statusCode = res.rsGenericHeaderDto.statusCode;
      if (statusCode == HttpStatusCode.Ok) {
        this.setData(res.rsUserDataDto);
        if (this.currentUser) {
          this._data.setUser = res.rsUserDataDto;
          this.isProfiledCompleted = true;
        }
      } else {
        this._snackbar.openSnackBar(res.rsGenericHeaderDto);
      }
    });
  }

  private setData(data: any): void {
    this.user.nombre = data.nombres;
    this.user.apellido = data.apellidos;
    this.user.email = data.email;
    this.user.rol = data.rol;
    this.user.estado = data.estado;
  }

  updateEstado() {
    this._user.updateUser(this.userId, { estado: this.user.estado }).subscribe({
      next: (res: any) => {
        const statusCode = res.rsGenericHeaderDto.statusCode;
        if (statusCode == HttpStatusCode.Ok) {
          this.getUser();
        } else {
          this._snackbar.openSnackBar(res.rsGenericHeaderDto);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateUser(): void {
    this._dialog
      .openDialog(FormUpdateUserComponent)
      .afterClosed()
      .subscribe(() => {
        this.getUser();
      });
  }

  goActivity(): void {
    this._router.navigate(['/home/activities']);
  }

  logout(): void {
    this._router.navigate(['/auth/login']);
  }
}
