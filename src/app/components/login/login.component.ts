import { Component, OnInit } from '@angular/core';


import { GLOBAL } from './../../services/global';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public usuario: Usuario;
  public title: String;
  public mensaje: String = null;
  public status: Boolean = false;

  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    public _us: UsuarioService
  ) {
    this.title = 'Login';

    this.usuario = new Usuario('','','','','', '');
  }

  ngOnInit() {
  }

  onSubmit(loginForm) {
    this.mensaje = '';
    this.status = false;
    // logeo
    this._us.signup(this.usuario)
      .subscribe(
      response => {
        // console.log(response);
        this.identity = response;

        if (!this.identity || !this.identity.Id) {

          this.mensaje = 'Error al ingresar';

        } else {
          // obtener token.
          localStorage.setItem('identity', JSON.stringify(this.identity));

          this._us.signupToken(this.usuario)
            .subscribe(
            res => {
              this.token = 'bearer ' + res.access_token;

              if (this.token.length <= 0) {
                this.mensaje = 'Token no generado';
              } else {
                localStorage.setItem('token', this.token);

                this.status = true;
                this._router.navigate(['/']);
              }
            },
            error => {
              // console.log(error);
              // const errmsj = <any>error;
              // if (errmsj != null) {
              //   const body = JSON.parse(errmsj);
              //   this.mensaje = body.message;
              // }
              this.mensaje = 'Error al ingresar';
            }
            );
        }
      },
      error => {
        this.mensaje = 'Error al ingresar';
        //  const errmsj = <any>error;
        //  console.log(errmsj);
        // if (errmsj != null) {
        //   const body = JSON.parse(errmsj);
        //   this.mensaje = body.statusText;
        // }
      }
      );
  }

}
