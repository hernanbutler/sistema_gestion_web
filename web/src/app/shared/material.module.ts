import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

const MODULES: any = [
  MatCardModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatTableModule,
];

@NgModule({
  declarations: [],
  imports: [MODULES],
  exports: [MODULES],
})
export class MaterialModule {}
