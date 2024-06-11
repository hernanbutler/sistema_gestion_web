import { Component } from '@angular/core';
import { DataService } from '@shared/services/data.service';
import { LogoutComponent } from '@shared/entry-components/logout/logout.component';
import { DialogService } from '@shared/services/dialog.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  constructor(
    public _data: DataService,
    private _dialog: DialogService,) {
    this.profile_link = '/home/profile/' + _data.getUser.id;
    this.isAdmin = this._data.getUser.rol === 'ADMINISTRADOR';
  }

  isAdmin: boolean;
  profile_link: string;
  

  logout(): void {
    this._dialog.openDialog(LogoutComponent);
  }
}
