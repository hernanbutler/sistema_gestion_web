import { DialogRef } from '@angular/cdk/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityService } from '@shared/services/activity.service';
import { SnackbarService } from '@shared/services/snackbar.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-delete-activity',
  templateUrl: './form-delete-activity.component.html',
  styleUrl: './form-delete-activity.component.scss',
})
export class FormDeleteActivityComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _activity: ActivityService,
    private _snackbar: SnackbarService,
    private _dialog: DialogRef,
    private spinner: NgxSpinnerService
  ) {}

  onSubmit(): void {
    this.spinner.show();
    this._activity.delete(this.data.id).subscribe((res: any) => {
      const statusCode = res.rsGenericHeaderDto.statusCode;
      if (statusCode == HttpStatusCode.Ok) {
        this.onClosed();
      } else {
        this._snackbar.openSnackBar(res.rsGenericHeaderDto);
      }
      this.spinner.hide();
    });
  }

  onClosed(): void {
    this._dialog.close();
  }
}
