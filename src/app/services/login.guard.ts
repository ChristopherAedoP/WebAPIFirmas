
import { UsuarioService } from './usuario.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _us: UsuarioService
  ) { }

  canActivate() {
    let identity = this._us.getIdentity();

    if (identity) {
      return true;
    } else {
      this._router.navigate(['/login']);

      return false;
    }
  }
}
