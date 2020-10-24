import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// modules
import { AppRoutingModule } from './app-routing.module';
// errors
import { Error404Component } from './error/error404/error404.component';
// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JoinComponent,
    Error404Component,
    DashboardComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
