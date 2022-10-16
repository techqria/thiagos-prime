import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../guard/authentication.guard';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterProductComponent } from './admin/register-product/register-product.component';
import { RemoveProductComponent } from './admin/remove-product/remove-product.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { PagesComponent } from './pages.component';

const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'cardapio', component: MenuComponent },
      { path: 'sobre-nos', component: AboutComponent },
      { path: 'acessorios', component: BoutiqueComponent },
    ],

  },
  { path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard] },
  { path: 'admin/novo-produto', component: RegisterProductComponent, canActivate: [AuthenticationGuard] },
  { path: 'admin/remover-produto', component: RemoveProductComponent, canActivate: [AuthenticationGuard] },
  { path: 'admin/login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }