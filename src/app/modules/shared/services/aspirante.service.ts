import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aspirante } from '../../aspirante/model/aspirante.model';
import { AuthService } from './auth.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AspiranteService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  addAspirante(aspirante: Aspirante): Observable<any> {
    //const httpHeader = new HttpHeaders({'Authorization': `Bearer ${this.authService.token}`});
    return this.http.post(`${base_url}/aspirante`, aspirante);
  }

  getAspiranteByExpediente(noExpediente: string) {
    return this.http.get(`${base_url}/aspirante/${noExpediente}`);
  }
}
