import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cargo } from '../../cargo/model/cargo';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) {}
  getCargos() {
    return this.http.get<Cargo[]>(`${base_url}/cargo`, {});
  }

  saveCargo(body: Partial<Cargo>) {
    return this.http.post(`${base_url}/cargo`, body);
  }

}
