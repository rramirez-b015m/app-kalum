import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateIdentification } from '../../login/model/update-identification.model';
import { Usuario } from '../../usuario/model/usuario.model';

const base_url_auth = environment.base_url_auth;
const base_url_roles = environment.base_roles;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string;
  private _usuario: Usuario;

  constructor(private http: HttpClient) {}

  public get token(): any {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = JSON.stringify(sessionStorage.getItem('token') as string);
      return this._token;
    }
    return null;
  }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      sessionStorage.getItem('usuario') != null
    ) {
      this._usuario = JSON.parse(
        sessionStorage.getItem('usuario') as string
      ) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  login(usuario: Usuario): Observable<any> {
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${base_url_auth}/cuentas/login`, usuario, {
      headers: httpHeaders,
    });
  }

  register(usuario: Usuario): Observable<any> {
    return this.http.post(`${base_url_auth}/cuentas/crear`, usuario);
  }

  associateRecordNumber(updateIdentification: UpdateIdentification){ 
    return this.http.post(`${base_url_auth}/cuentas/finish-register`,updateIdentification); 
  }

  
  getToken(token: string): any {
    if (token && token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  saveToken(token: string): void {
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  saveUser(payload: any): void {
    this._usuario = new Usuario();
    this._usuario.username = payload.username;
    this._usuario.email = payload.email;
    this._usuario.identificationId = payload.identificationId;
    this._usuario.roles = payload[base_url_roles];
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  logout(): void {
    this._token = '';
    this._usuario == null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  isAuthenticated(): boolean {
    if (this.token != null) {
      let payload = this.getToken(this.token);
      if (
        payload != null &&
        payload.unique_name &&
        payload.unique_name.length > 0
      ) {
        return true;
      }
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }
}
