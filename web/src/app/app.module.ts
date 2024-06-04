import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthModule } from '@layout/auth/auth.module';
import { HomeModule } from '@layout/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const COMPONENTS: any = [AppComponent];
const MODULES: any = [
  BrowserModule,
  BrowserAnimationsModule,
  NgxSpinnerModule,
  AuthModule,
  HomeModule,
  AppRoutingModule,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  bootstrap: [COMPONENTS],
  providers: [provideAnimationsAsync()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
