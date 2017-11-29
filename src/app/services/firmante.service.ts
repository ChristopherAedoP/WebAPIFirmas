import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx'; // Map
import { Observable } from "rxjs/Observable";
import { Firmante } from '../components/models/firmante';

@Injectable()
export class FirmanteService {
  private urlHostAPI = 'http://api.demofirmasimg.cl';

  constructor(private _http: Http) { }

  getFirmantes() {

    const _url = `${this.urlHostAPI}/api/Firmantes`;

    return this._http.get(_url)
      .map(res=> res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getFirmante(id: string) {

    const _url = `${this.urlHostAPI}/api/Firmante/${id} `;

    return this._http.get(_url)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  addFirmante(token, firmantes: Firmante) {

    const _url = `${this.urlHostAPI}/api/Firmante `;

    const body = JSON.stringify(firmantes);

    const headers = new Headers({
      'Authorization':  token,
      'Content-Type': 'application/json'
    });

    return this._http.post(_url, body, { headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateFirmante(token, firmantes: Firmante) {

    const _url = `${this.urlHostAPI}/api/Firmante `;

    const body = JSON.stringify(firmantes);

    const headers = new Headers({
      'Authorization': token,
      'Content-Type': 'application/json'
    });

    // console.log('body', body);

    return this._http.put(_url, body, { headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteFirmante(token, id) {

    const _url = `${this.urlHostAPI}/api/Firmante/${id} `;

    const headers = new Headers({
      'Authorization': token,
      'Content-Type': 'application/json'
    });

    return this._http.delete(_url, { headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  GetFirmaImage(rut){

    const _url = `${this.urlHostAPI}/api/FirmaImagexRutBase64?rut=${rut} `;

    return this._http.get(_url)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
