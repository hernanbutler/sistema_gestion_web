import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RsUsers } from '@shared/models';
import { DataService } from '@shared/services/data.service';
import { UserService } from '@shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private _data: DataService,
    private _user: UserService
  ) {}

  ngOnInit(): void {
    if (this._data.getUser.rol == 'ADMINISTRADOR') {
      this.spinner.show();
      this._user.users().subscribe((res: RsUsers) => {
        const statusCode = res.rsGenericHeaderDto.statusCode;
        if (statusCode == HttpStatusCode.Ok) {
          this._data.setUsers = res.rsUsersDataDto;
        }
      });
    }
  }
}
