import { Component, OnInit } from '@angular/core';
import { Firmante } from '../models/firmante';

import { FirmanteService } from '../../services/firmante.service';

import { GLOBAL } from '../../services/global';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-busca-firma',
  templateUrl: './busca-firma.component.html'
})
export class BuscaFirmaComponent implements OnInit {

  public identity;
  public token;
  public mensaje: String = null;
  public firmante: Firmante;
  public status: Boolean = false;
  public loading = false;
  public txtRut:string='';
  public firmaImg;

  constructor(public _fs: FirmanteService,
              private sanitizer: DomSanitizer)
  { }

  ngOnInit() {
  }

  buscaFirma(){
  }

  onSubmit(buscaFirmaForm){
    this.loading = true;
    this.mensaje="",
    // this._fs.GetFirmaImage(this.txtRut)

    this._fs.GetFirmaImage(this.txtRut)
    .subscribe(
      data => {
        // console.log(data);
        if (data) {
          this.firmaImg = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + data);

        }else{
          this.mensaje = "No se encontro firma."
        }
        this.loading = false;
      },error => {
        this.mensaje = "No se encontro firma."
        this.loading = false;
      }

    )
  }


}
