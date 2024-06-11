import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { NgIconsModule } from '@ng-icons/core';
import {
<<<<<<< HEAD
=======
  matArrowDownward,
  matArrowUpward,
>>>>>>> origin/master
  matCameraAlt,
  matClose,
  matDelete,
  matEdit,
  matEquals,
  matKey,
  matKeyOff,
  matRemoveRedEye,
  matSearch,
  matWarning,
  matWarningAmber,
} from '@ng-icons/material-icons/baseline';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MaterialModule } from './material.module';
import { AuthComponent } from '@layout/auth/auth.component';
import { HomeComponent } from '@layout/home/home.component';
import { ChipComponent } from './components/chip/chip.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { ErrorComponent } from './components/error/error.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { SearchComponent } from './components/search/search.component';
import { SelectComponent } from './components/select/select.component';
import { SnackBarComponent } from './components/snackbar/snackbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormCreateActivityComponent } from './entry-components/form-create-activity/form-create-activity.component';
import { FormCreateUserComponent } from './entry-components/form-create-user/form-create-user.component';
import { FormUpdateActivityComponent } from './entry-components/form-update-activity/form-update-activity.component';
import { FormUpdateUserComponent } from './entry-components/form-update-user/form-update-user.component';
import { FormViewActivityComponent } from './entry-components/form-view-activity/form-view-activity.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { EstadoPipe } from './pipes/estado.pipe';
import { UserPipe } from './pipes/user.pipe';

const COMPONENTS: any = [
  AuthComponent,
  ChipComponent,
  DatepickerComponent,
  ErrorComponent,
  FormFieldComponent,
  HomeComponent,
  SearchComponent,
  SelectComponent,
  SnackBarComponent,
  ToolbarComponent,
  FormCreateActivityComponent,
  FormCreateUserComponent,
  FormUpdateActivityComponent,
  FormUpdateUserComponent,
  FormViewActivityComponent,
];
const MODULES: any = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  MaterialModule,
  NgIconsModule.withIcons({
<<<<<<< HEAD
=======
    matArrowDownward,
    matArrowUpward,
>>>>>>> origin/master
    matCameraAlt,
    matClose,
    matDelete,
    matEdit,
    matEquals,
    matKey,
    matKeyOff,
    matRemoveRedEye,
    matSearch,
    matWarning,
    matWarningAmber,
  }),
  NgSelectModule,
  NgxSpinnerModule,
  MatTableExporterModule,
  ReactiveFormsModule,
  RouterModule,
];
const PIPES: any = [EstadoPipe, UserPipe];

@NgModule({
  declarations: [COMPONENTS, PIPES],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES, PIPES],
<<<<<<< HEAD
  providers: [provideHttpClient(withInterceptors([authInterceptor])), PIPES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
=======
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    PIPES,
  ],
>>>>>>> origin/master
})
export class SharedModule {}
