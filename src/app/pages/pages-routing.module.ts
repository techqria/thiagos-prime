import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CheckLoginComponent } from './admin/login/check-login/check-login.component';
import { RegisterProductComponent } from './admin/register-product/register-product.component';
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
  { path: 'admin', component: CheckLoginComponent, },
  { path: 'admin/novo-produto', component: RegisterProductComponent }

];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
