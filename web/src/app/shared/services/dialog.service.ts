import { ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserComponent } from '@modules/home/user/user.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private _dialog: MatDialog) {}

  openDialog(component: ComponentType<any>) {
    const config: MatDialogConfig = {
      // data,
    };
    return this._dialog.open(component, config);
  }
}
