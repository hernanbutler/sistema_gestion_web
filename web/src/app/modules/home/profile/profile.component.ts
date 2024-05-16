import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormUpdateUserComponent } from '@shared/entry-components/form-update-user/form-update-user.component';
import { RsUser } from '@shared/models';
import { DataService } from '@shared/services/data.service';
import { DialogService } from '@shared/services/dialog.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  currentUser: boolean = false;
  isAdmin: boolean;
  constructor(
    private _user: UserService,
    private _data: DataService,
    private _dialog: DialogService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.isAdmin = this._data.getUser.rol === 'ADMINISTRADOR';
  }

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
      const userId = params.get('id');
      const rol_ejecutor = this._data.getUser.rol == 'EJECUTOR';
      this.currentUser = userId == this._data.getUser.id;
      if (rol_ejecutor && !this.currentUser) {
        this._router.navigate(['/home/profile/' + this._data.getUser.id]);
      }
      this._user.user(userId).subscribe((res: RsUser) => {
        this.setData(res.rsUserDataDto);
      });
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
    console.log(this.user);
  }

  updateUser(): void {
    this._dialog
      .openDialog(FormUpdateUserComponent)
      .afterClosed()
      .subscribe(() => {});
  }

  goActivity(): void {
    this._router.navigate(['/home/activities']);
  }

  logout(): void {
    this._router.navigate(['/auth/login']);
  }
}
