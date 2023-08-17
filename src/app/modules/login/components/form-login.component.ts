import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../shared/services/auth.service';
import { Usuario } from '../../usuario/model/usuario.model';
import Swal from 'sweetalert2';
import { FormRegisterComponent } from './form-register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent implements OnInit {
  public loginForm: FormGroup;
  usuario: Usuario = new Usuario();
  ngOnInit(): void {}

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormLoginComponent>,
    private authService: AuthService,
    private dialogFormRegister: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      username: ['test01', Validators.required],
      password: ['Inicio.2023', Validators.required],
    });
  }

  openFormRegister(){
    const dialogFormRegisterRef = this.dialogFormRegister.open(FormRegisterComponent, {
      width: '450px'
    });
    this.dialogRef.close(2);
  }

  onCancel() {
    this.dialogRef.close(2);
  }

  onLogin() {
    this.usuario.username = this.loginForm.get('username')?.value;
    this.usuario.password = this.loginForm.get('password')?.value;
    this.authService.login(this.usuario).subscribe((response) => {
      const payload = this.authService.getToken(response.token);
      this.authService.saveToken(response.token);
      this.authService.saveUser(payload);
      Swal.fire({
        icon: 'success',
        title: 'Login Success',
        text: `Bienvenido ${payload.username} al sistema kalum v1.0.0`,
        footer: 'Kalum v1.0.0',
      }).then((result) => {
        if (result.isConfirmed) {
          if(this.data != null){
            this.router.navigate(['/dashboard/update-identification/form'],{queryParams:{type: this.data.type,identificationId: this.data.identificationId}});
            this.dialogRef.close(1);
          } else{
            this.router.navigate(['/dashboard/home']);
            this.dialogRef.close(1);
          }
          this.dialogRef.close(1);
        }
      });
    });
  }
}
