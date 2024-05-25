import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _router: Router,
    private _dialog: DialogRef
  ) {}

  onSubmit(): void {
    this._dialog.close();
    this._router.navigate(['/auth/login']);
  }

  onClosed(): void {
    this._dialog.close();
  }
}
