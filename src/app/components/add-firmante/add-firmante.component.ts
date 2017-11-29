import { Component, OnInit } from '@angular/core';
import { Firmante } from '../models/firmante';
import { FirmanteService } from '../../services/firmante.service';
import { UsuarioService } from '../../services/usuario.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-add-firmante',
  templateUrl: './add-firmante.component.html'
})
export class AddFirmanteComponent implements OnInit {
  public identity;
  public token;
  public mensaje: String = null;
  public firmante: Firmante;
  public status: Boolean = false;

  constructor(private _sf:FirmanteService,
              private _us:UsuarioService,
              private _router: Router) {

    this.token = this._us.getToken();
    this.firmante = new Firmante(0,'','',0,'');

  }

  ngOnInit() {
  }
  onSubmit(FirmanteForm) {
    this._sf.addFirmante(this.token, this.firmante)
      .subscribe(
      response => {

        // console.log(response);

        if (response && response.Id) {


          this.mensaje = 'Firmante creado.';
          this.status = true;

          this._router.navigate(['/firmantes']);

        } else {
          this.status = false;
          this.mensaje = 'Error al crear';
          console.log(response);
        }

        // console.log(response.user);
      },
      error => {
        this.mensaje = 'Error al crear';
        console.error(<any>error);
      }
      );
  }
}
