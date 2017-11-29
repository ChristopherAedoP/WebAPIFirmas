import { Component, OnInit } from '@angular/core';
import { Firmante } from '../models/firmante';
import { FirmanteService } from '../../services/firmante.service';
import { UsuarioService } from '../../services/usuario.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-update-firmante',
  templateUrl: './update-firmante.component.html'
})

export class UpdateFirmanteComponent implements OnInit {
  public loading = true;
  public identity;
  public token;
  public mensaje: String = null;
  public firmante: Firmante;
  public status: Boolean = false;
  public files_to_upload: Array<File>;
  public url: string;

  constructor(private _sf: FirmanteService,
              private _us: UsuarioService,
              private _route: ActivatedRoute,
              private _router: Router,
              public _ups: UploadService)
  {
    this.url = GLOBAL.urlAPI;
    this.token = this._us.getToken();
    this.getFirmante();
    // console.log('this.firmante inicio', this.firmante);
  }

  ngOnInit() {
  }

  getFirmante() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._sf.getFirmante(id).subscribe(
        response => {

          // console.log(response);

          if (response) {
            this.firmante = response;
            this.loading = false;
          } else {
            this._router.navigate(['/']);
          }

        },
        error => {
          console.error(<any>error);
        }
      );
    });
  }

  onSubmit() {

    if (this.files_to_upload) {
      this._ups.makeFileRequest(this.url + '/api/FirmaImage?Firmanteid=' + this.firmante.Id, [], this.files_to_upload, this.token, 'image')
        .then((result: any) => {
          //  console.log(result);
          this.firmante.IdFirma = result.idFirma;
          this.firmante.UrlFirma = result.UrlFirma;
        });
    }
    // console.log('this.firmante update' , this.firmante);

    this._sf.updateFirmante(this.token, this.firmante)
      .subscribe(
        response => {

          // console.log(response);

            this.mensaje = 'Firmante Actualizado.';
            this.status = true;

            this._router.navigate(['/firmantes']);

          // console.log(response.user);
        },
        error => {
          this.mensaje = 'Error al actualizar';
          console.error(<any>error);
        }
      );
  }

  fileChangeEvent(fileinput: any) {
    this.files_to_upload = <Array<File>>fileinput.target.files;
    console.log(this.files_to_upload);

  }

}
