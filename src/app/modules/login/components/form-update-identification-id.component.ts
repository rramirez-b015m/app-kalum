import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/services/auth.service';
import { UpdateIdentification } from '../model/update-identification.model';

@Component({
  selector: 'app-form-update-identification-id',
  templateUrl: './form-update-identification-id.component.html',
  styleUrls: ['./form-update-identification-id.component.css'],
})
export class FormUpdateIdentificationIdComponent implements OnInit {
  public formUpdateIdentificationId: FormGroup;
  updateIdentification: UpdateIdentification = new UpdateIdentification();

  constructor(
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.activatedRouter.queryParams.subscribe((params: any) => {
      if (params.type && params.identificationId) {
        this.updateIdentification.type = params.type;
        this.updateIdentification.email = this.authService.usuario.email;
        this.updateIdentification.identificationId = params.identificationId;
      }
    });
    this.formUpdateIdentificationId = formBuilder.group({
      email: [this.updateIdentification.type, Validators.required],
      identificationId: [
        this.updateIdentification.identificationId,
        Validators.required,
      ],
    });
  }
  ngOnInit(): void {}

  save() {
    this.authService.associateRecordNumber(this.updateIdentification).subscribe(
      (response: any) => {
        if (response && response.token) {
          Swal.fire({
            icon: 'success',
            title: `Asociar número de ${this.updateIdentification.type}`,
            text: response.message,
            footer: 'Kalum v1.0.0',
          }).then((result) => {
            if (result.isConfirmed) {
              const payload = this.authService.getToken(response.token);
              this.authService.saveToken(response.token);
              this.authService.saveUser(payload);
              this.router.navigate(['/dashboard/home']);
            }
          });
        }
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: `Asociar número de ${this.updateIdentification.type}`,
          text: 'Error al momento de realizar el proceso',
          footer: 'Kalum v1.0.0',
        });
      }
    );
  }

  cancel(){
    this.router.navigate(['/dashboard/home']);
  }
}
