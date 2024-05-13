import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

const MODULES: any = [MatSnackBarModule, MatTableModule];

@NgModule({
  declarations: [],
  imports: [MODULES],
  exports: [MODULES],
})
export class MaterialModule {}
