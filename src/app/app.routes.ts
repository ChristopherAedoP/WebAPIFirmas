
import { LoginComponent } from './components/login/login.component';
import { AddFirmanteComponent } from './components/add-firmante/add-firmante.component';


import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { FirmanteComponent } from './components/firmante/firmante.component';

import { LoginGuard } from './services/login.guard';
import { UpdateFirmanteComponent } from './components/update-firmante/update-firmante.component';
import { BuscaFirmaComponent } from './components/busca-firma/busca-firma.component';

const app_routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'firmantes', component: FirmanteComponent },
  { path: 'addfirmante', component: AddFirmanteComponent, canActivate: [LoginGuard]},
  { path: 'updatefirmante/:id', component: UpdateFirmanteComponent, canActivate: [LoginGuard] },
  { path: 'buscaFirma', component: BuscaFirmaComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home'},
];


export const APP_ROUTING = RouterModule.forRoot(app_routes)
