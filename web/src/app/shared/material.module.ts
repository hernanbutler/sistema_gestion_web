import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { provideNativeDateAdapter } from '@angular/material/core';

const MODULES: any = [
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
  providers: [provideNativeDateAdapter()],
})
export class MaterialModule {}
