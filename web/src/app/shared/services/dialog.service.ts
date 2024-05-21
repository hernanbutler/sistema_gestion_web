import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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
