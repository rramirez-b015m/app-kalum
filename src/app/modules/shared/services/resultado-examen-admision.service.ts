import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultadoExamenAdmision } from '../../resultado-examen-admision/model/resultado-examen-admision';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ResultadoExamenAdmisionService {

  constructor(private http: HttpClient) { }

  getResultadosExamenesAdmisiones() {
    return this.http.get(
      `${base_url}/resultados-examen-admision`);
  }

  saveResultadoExamenAdmision(body: Partial<ResultadoExamenAdmision>) {
    return this.http.post(`${base_url}/resultados-examen-admision`, body);
  }

  deleteResultadoExamenAdmision(id: string) {
    return this.http.delete(`${base_url}/resultados-examen-admision/${id}`);
  }

  updateResultadoExamenAdmision(
    id: string,
    body: Partial<ResultadoExamenAdmision>
  ) {
    return this.http.put(
      `${base_url}/resultados-examen-admision/${id}`,
      body
    );
  }
}
