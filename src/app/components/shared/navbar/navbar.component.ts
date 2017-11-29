import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public identity;

  constructor(public _us: UsuarioService,
              private _router: Router)
              { }

  ngOnInit() {
    this.identity = this._us.getIdentity();
  }
  ngDoCheck() {
    this.identity = this._us.getIdentity();
  }
  logout() {
    localStorage.clear();
    this.identity = null;
    // this.token = null;
    this._router.navigate(['/']);
  }
}
