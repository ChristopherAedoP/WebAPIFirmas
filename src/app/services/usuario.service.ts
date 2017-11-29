import {HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

import { Observable, } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Usuario } from '../components/models/usuario';


@Injectable()
export class UsuarioService {

  public urlHostAPI: string;
  public identity;
  public token;

  constructor(
    private _http: Http
  ) {
    this.urlHostAPI = GLOBAL.urlAPI;

  }

  signup(user_to_login: Usuario) {

    const _url = `${this.urlHostAPI}/api/usuario?username=${user_to_login.UserName}&password=${user_to_login.password}`;

    // const _params = JSON.stringify(user_to_login);
    const _headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http.get(_url, { headers: _headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error));

  }
  signupToken(user_to_login :Usuario) {

    const _headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('UserName', user_to_login.UserName );
    body.set('password', user_to_login.password );

    return this._http.post(this.urlHostAPI + '/oauth/token', body.toString())
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error));

  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity !== undefined) {
      this.identity = identity;

    } else {
      this.identity = null;
    }

    return this.identity;

  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token !== undefined) {
      this.token = token;

    } else {
      this.token = null;
    }

    return this.token;

  }
}
