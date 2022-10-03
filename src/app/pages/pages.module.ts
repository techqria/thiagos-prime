import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './admin/login/form/form.component';
import { AdminComponent } from './admin/admin/admin.component';
import { CheckLoginComponent } from './admin/login/check-login/check-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterProductComponent } from './admin/register-product/register-product.component';


@NgModule({
  declarations: [
    PagesComponent,
    MenuComponent,
    MainComponent,
    NavbarComponent,
    FormComponent,
    AdminComponent,
    CheckLoginComponent,
    RegisterProductComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
