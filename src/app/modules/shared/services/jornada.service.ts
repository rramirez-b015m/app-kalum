import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class JornadaService {
  constructor(private http: HttpClient) {}

  getJornadas() {
    return this.http.get(`${base_url}/jornadas`);
  }

  saveJornada(body: any ) {
    return this.http.post(`${base_url}/jornadas`, body);
  }

  deleteJornada(id: string) {
    return this.http.delete(`${base_url}/jornadas/${id}`, {});
  }

  updateJornada(body:any, id:any){
    const endPoint = `${base_url}/jornadas/${id}`;
    return this.http.put(endPoint,body);
  }

}
