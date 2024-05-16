import { Component } from '@angular/core';
import { DataService } from '@shared/services/data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  isAdmin: boolean;

  constructor(private _data: DataService) {
    this.isAdmin = this._data.getUser.rol === 'ADMINISTRADOR';
  }

  link_profile: string = '/home/profile/' + this._data.getUser.id;
}
