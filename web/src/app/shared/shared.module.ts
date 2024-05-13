import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { NgIconsModule } from '@ng-icons/core';
import {
  matClose,
  matKey,
  matKeyOff,
  matWarning,
  matWarningAmber,
} from '@ng-icons/material-icons/baseline';
import { MaterialModule } from './material.module';

import { AuthComponent } from '@layout/auth/auth.component';
import { HomeComponent } from '@layout/home/home.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { SnackBarComponent } from './components/snackbar/snackbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { authInterceptor } from './interceptors/auth.interceptor';

const COMPONENTS: any = [
  AuthComponent,
  HomeComponent,
  FormFieldComponent,
  SnackBarComponent,
  ToolbarComponent,
];
const MODULES: any = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  RouterModule,
  NgIconsModule.withIcons({
    matClose,
    matKey,
    matKeyOff,
    matWarning,
    matWarningAmber,
  }),
  MaterialModule,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
})
export class SharedModule {}
