import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthModule } from '@layout/auth/auth.module';
import { HomeModule } from '@layout/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const COMPONENTS: any = [AppComponent];
const MODULES: any = [BrowserModule, AuthModule, HomeModule, AppRoutingModule];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  bootstrap: [COMPONENTS],
  providers: [provideAnimationsAsync()],
})
export class AppModule {}
