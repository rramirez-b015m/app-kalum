import { Inject, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FormLoginComponent } from 'src/app/modules/login/components/form-login.component';
import { UpdateIdentification } from 'src/app/modules/login/model/update-identification.model';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
    updateIdentification: UpdateIdentification = new UpdateIdentification();
  constructor(private authService: AuthService, private dialogRef: MatDialog) {}

  canActivate(
    next: ActivatedRoute,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    Swal.fire({
        icon: 'success',
        title: 'Login Success',
        text: `Es necesario que inicie sesion para completar el proceso `,
        footer: 'Kalum v1.0.0',
      }).then(result =>{
        if(result.isConfirmed){
            if(next.params){
                let params: any = next.queryParams;
                if(params.type && params.identificationId){
                    this.updateIdentification.type = params.type;
                    this.updateIdentification.identificationId = params.identificationId;
                    this.dialogRef.open(FormLoginComponent,{
                        width: '450px',
                        data: this.updateIdentification
                    });
                }
            } else{
                this.dialogRef.open(FormLoginComponent,{
                    width: '450px'
                });
            }
        }
      });
    return false;
  }
}
