import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterProductComponent } from './admin/register-product/register-product.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { RemoveProductComponent } from './admin/remove-product/remove-product.component';
import { LoginComponent } from './admin/login/login.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';

@NgModule({
  declarations: [
    PagesComponent,
    MenuComponent,
    MainComponent,
    NavbarComponent,
    AdminComponent,
    RegisterProductComponent,
    AboutComponent,
    FooterComponent,
    BoutiqueComponent,
    RemoveProductComponent,
    LoginComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
