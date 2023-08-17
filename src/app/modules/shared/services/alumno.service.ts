import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alumno } from '../../alumno/model/alumno.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) {}
  addAlumno(alumno: Alumno): Observable<any>{
    return this.http.post(`${base_url}/alumnos`,alumno);

  }
}
