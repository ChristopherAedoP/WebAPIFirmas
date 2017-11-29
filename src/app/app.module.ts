import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FirmanteComponent } from './components/firmante/firmante.component';

//Rutas
import { APP_ROUTING } from './app.routes';

//servicios

import { FirmanteService } from './services/firmante.service';
import { UsuarioService } from './services/usuario.service';
import { UploadService } from './services/upload.service';

import { LoginGuard } from './services/login.guard';


//Component
import { AddFirmanteComponent } from './components/add-firmante/add-firmante.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateFirmanteComponent } from './components/update-firmante/update-firmante.component';
import { BuscaFirmaComponent } from './components/busca-firma/busca-firma.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FirmanteComponent,
    AddFirmanteComponent,
    LoginComponent,
    UpdateFirmanteComponent,
    BuscaFirmaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [
    FirmanteService,
    UsuarioService,
    LoginGuard,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
