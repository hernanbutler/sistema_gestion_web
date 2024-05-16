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
  matSearch,
  matWarning,
  matWarningAmber,
} from '@ng-icons/material-icons/baseline';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from './material.module';

import { AuthComponent } from '@layout/auth/auth.component';
import { HomeComponent } from '@layout/home/home.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { SearchComponent } from './components/search/search.component';
import { SelectComponent } from './components/select/select.component';
import { SnackBarComponent } from './components/snackbar/snackbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormCreateUserComponent } from './entry-components/form-create-user/form-create-user.component';
import { FormUpdateUserComponent } from './entry-components/form-update-user/form-update-user.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { EstadoPipe } from './pipes/estado.pipe';

const COMPONENTS: any = [
  AuthComponent,
  FormFieldComponent,
  HomeComponent,
  SearchComponent,
  SelectComponent,
  SnackBarComponent,
  ToolbarComponent,
  FormCreateUserComponent,
  FormUpdateUserComponent,
];
const MODULES: any = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  MaterialModule,
  NgIconsModule.withIcons({
    matClose,
    matKey,
    matKeyOff,
    matSearch,
    matWarning,
    matWarningAmber,
  }),
  NgSelectModule,
  ReactiveFormsModule,
  RouterModule,
];
const PIPES: any = [EstadoPipe];

@NgModule({
  declarations: [COMPONENTS, PIPES],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES, PIPES],
  providers: [provideHttpClient(withInterceptors([authInterceptor])), PIPES],
})
export class SharedModule {}
