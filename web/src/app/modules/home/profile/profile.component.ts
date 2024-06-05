import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormUpdateUserComponent } from '@shared/entry-components/form-update-user/form-update-user.component';
import { LogoutComponent } from '@shared/entry-components/logout/logout.component';
import { DataService } from '@shared/services/data.service';
import { DialogService } from '@shared/services/dialog.service';
import { SnackbarService } from '@shared/services/snackbar.service';
import { UserService } from '@shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private spinner: NgxSpinnerService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.isAdmin = this._data.getUser.rol === 'ADMINISTRADOR';
  }

  currentUser: boolean = false;
  isAdmin: boolean;
  isProfiledCompleted: boolean = true;
  userId: any;
  avatar: any = 'assets/images/avatar-default.png';

  user: any = {
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    estado: 0,
    imagen: '',
  };

  estadoOption: any[] = [
    { ID: 0, name: 'Inactivo' },
    { ID: 1, name: 'Activo' },
  ];

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.currentUser = this.userId == this._data.getUser.id;
      this.getUser();
    });
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
<<<<<<< HEAD
            this.avatar = this.sanitizer.bypassSecurityTrustUrl(objectURL);
=======
            this.user.imagen = this.sanitizer.bypassSecurityTrustUrl(objectURL);
>>>>>>> origin/master
          });
        }
      } else {
        this._snackbar.openSnackBar(res.rsGenericHeaderDto);
      }
      this.spinner.hide();
    });
    this.spinner.hide();
  }

  private setData(data: any): void {
    this.user.nombre = data.nombres;
    this.user.apellido = data.apellidos;
    this.user.email = data.email;
    this.user.rol = data.rol;
    this.user.estado = data.estado;
    this.user.imagen = data.imagen ?? 'assets/images/avatar-default.png';
  }

  updateEstado() {
    this.spinner.show();
    this._user
      .updateUser(this.userId, { estado: this.user.estado })
      .subscribe((res: any) => {
        const statusCode = res.rsGenericHeaderDto.statusCode;
        if (statusCode == HttpStatusCode.Ok) {
          this.getUser();
        } else {
          this._snackbar.openSnackBar(res.rsGenericHeaderDto);
        }
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

  uploadImage(event: any) {
<<<<<<< HEAD
=======
    this.spinner.show();
>>>>>>> origin/master
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    this._user.upload(this.userId, formData).subscribe(() => {
      this.getUser();
    });
  }

  goActivity(): void {
    sessionStorage.setItem('activity', this.userId);
    this._router.navigate(['/home/activities']);
  }

  logout(): void {
    this._dialog.openDialog(LogoutComponent);
  }
}
