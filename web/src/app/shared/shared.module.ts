import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { withInterceptors, provideHttpClient } from '@angular/common/http';

import { NgIconsModule } from '@ng-icons/core';
import {
  matKey,
  matKeyOff,
  matWarningAmber,
} from '@ng-icons/material-icons/baseline';

import { FormFieldComponent } from './components/form-field/form-field.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

const COMPONENTS: any = [FormFieldComponent];
const MODULES: any = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgIconsModule.withIcons({ matKey, matKeyOff, matWarningAmber }),
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
  ],
})
export class SharedModule {}
