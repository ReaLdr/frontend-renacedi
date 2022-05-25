import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
  ],
  exports: [
    AdminLoginComponent
  ]
})
export class AuthModule { }
