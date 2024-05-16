import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarComponent } from '@shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(data: any) {
    const config: MatSnackBarConfig = {
      panelClass: 'snack-bar-container',
      data,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5 * 1000,
    };
    this._snackBar.openFromComponent(SnackBarComponent, config);
  }
}
