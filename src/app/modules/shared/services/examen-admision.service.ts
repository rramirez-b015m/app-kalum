import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExamenAdmision } from '../../examen-admision/model/examen-admision.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ExamenAdmisionService {

  constructor(private http: HttpClient ) { }
  getExamenAdmision(){
    return this.http.get(`${base_url}/examen-admision`)
  }

  saveExamenAdmision(body: Partial<ExamenAdmision>) {
    return this.http.post(`${base_url}/examen-admision`, body);
  }

  deleteExamenAdmision(id: string) {
    return this.http.delete(`${base_url}/examen-admision/${id}`, {});
  }

  updateExamenAdmision(body:any, id:any){
    const endPoint = `${base_url}/examen-admision/${id}`;
    return this.http.put(endPoint,body);
  }


}
