import { Component, OnInit } from '@angular/core';
import { FirmanteService } from '../../services/firmante.service';
import { Firmante } from '../models/firmante';
import { UsuarioService } from '../../services/usuario.service';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-firmante',
  templateUrl: './firmante.component.html'
})
export class FirmanteComponent implements OnInit {
  public firmantes: Firmante[] = [];
  public loading = true;
  public id_firmante_delete = 0;
  public token;
  public identity;
  public url: string;

  constructor(private _fs: FirmanteService,
              private _us: UsuarioService)
  {
    this.getFirmantes();
    this.token = this._us.getToken();
    this.identity = this._us.getIdentity();
    this.url = GLOBAL.urlAPI;
  }
  getFirmantes(){
    this._fs.getFirmantes().subscribe(
      data => {
        // console.log('data', data)
        this.firmantes = data;
        this.loading = false;
      }
    )
  }
  ngOnInit() {
    $('#myModal').on('show.bs.modal', (event) => {

      let button = $(event.relatedTarget);

      let firmantename = button.data('firmantename');
      this.id_firmante_delete = button.data('firmanteid');

      $('.firmantename').text(firmantename);

    });

  }
  deleteFirmante() {

    this._fs.deleteFirmante(this.token, this.id_firmante_delete)
    .subscribe(
      response => {
        console.log(response);
        // if (response) {
          this.getFirmantes();
        // } else {
        //   alert('Error eliminar firmante');
        // }

      },
      error => {
        console.error(<any>error);
        alert('Error en el servidor al eliminar firmante.');
      }

    );
  }
}
