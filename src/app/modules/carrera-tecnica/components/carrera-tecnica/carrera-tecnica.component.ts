import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormRegisterAspiranteComponent } from 'src/app/modules/aspirante/components/form-register-aspirante.component';
import { FormLoginComponent } from 'src/app/modules/login/components/form-login.component';
import { AspiranteService } from 'src/app/modules/shared/services/aspirante.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import Swal from 'sweetalert2';
import { FormCarreraTecnicaComponent } from './form-carrera-tecnica.component';

@Component({
  selector: 'app-carrera-tecnica',
  templateUrl: './carrera-tecnica.component.html',
  styleUrls: ['./carrera-tecnica.component.css'],
})
export class CarreraTecnicaComponent implements OnInit {
  displayColumns: String[] = ['number', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource<CarreraTecnicaElement>();
  pipe = new DatePipe('en-US');

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    public authservice: AuthService,
    private carreraTecnicaService: CarreraTecnicaService,
    public dialog: MatDialog,
    private aspiranteService: AspiranteService
  ) {}

  ngOnInit(): void {
    this.getCarrerasTecnicas();
  }

  openFormRegisterAspirante(carreraId: string, nombre: string) {
    if (this.authservice.isAuthenticated()) {
      if (this.authservice.usuario.identificationId == '0') {
        const FormRegisterAspiranteRef = this.dialog.open(
          FormRegisterAspiranteComponent,
          {
            width: '450px',
            data: {
              email: this.authservice.usuario.email,
              carreraId: carreraId,
            },
          }
        );
      } else {
        if (this.authservice.hasRole('ROLE_CANDIDATE')) {
          this.aspiranteService
            .getAspiranteByExpediente(this.authservice.usuario.identificationId)
            .subscribe((data: any) => {
              if (data.estatus == 'NO ASIGNADO') {
                Swal.fire({
                  icon: 'error',
                  title: 'Inscripción',
                  html: `<b><span style="color:#303F9F">${
                    data.nombreCompleto
                  }</span></b> <hr> Actualmente tiene una solicitud pendiente, el estatus actual es <b><span style="color:#FF0000">${
                    data.estatus
                  }</span></b><hr> ${
                    data.carreraTecnica.nombre
                  }<br>${this.pipe.transform(
                    data.examenAdmision.fechaExamen,
                    'dd/MM/yyyy HH:mm:ss'
                  )}`,
                  footer: 'Kalum v1.0.0',
                });
              } else if ((data.estatus = 'NO SIGUE PROCESO DE ADMISIÓN')) {
                Swal.fire({
                  icon: 'error',
                  title: 'Inscripción',
                  html: `El estatus actual de su solicitud es <br> <hr> <b> <span style="color:#FF0000">${data.estatus}</span></b>`,
                  footer: 'Kalum v1.0.0',
                });
              } else if ((data.estatus = 'SIGUE CON PROCESO DE ADMISION')) {
              }
            });
        }
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Carreras técnicas',
        html: `Debes iniciar sesión o crear una cuenta`,
        footer: 'Kalum v1.0.0',
      }).then((result) => {
        if (result.isConfirmed) {
          this.dialog.open(FormLoginComponent, { width: '450px' });
        }
      });
    }
  }

  openFormCarreraTecnica() {
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if ((result = 1)) {
        Swal.fire(
          'Carreras Tecnicas',
          'Registro almacenado correctamente',
          'success'
        );
        this.getCarrerasTecnicas();
      } else if ((result = 2)) {
        Swal.fire('Carreras Tecnicas', 'Error al agregar el registro', 'error');
      }
    });
  }

  getCarrerasTecnicas() {
    this.carreraTecnicaService.getCarrerasTecnicas().subscribe((data) => {
      console.log(data);
      this.processCarreraTecnicaResponse(data);
    });
  }

  editCarreraTecnica(carreraid: string, nombre: string) {
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, {
      width: '450px',
      data: { carreraid: carreraid, nombre: nombre },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        Swal.fire('Carreras Tecnicas', 'Registro Almacenado', 'success');
        this.getCarrerasTecnicas();
      } else if (result == 2) {
        Swal.fire('Carreras Tecnicas', 'Ups hubo error', 'error');
      }
    });
  }

  processCarreraTecnicaResponse(data: any) {
    const dataCarreraTecnica: CarreraTecnicaElement[] = [];
    let listCarreraTecnica = data;
    let number = 1;
    listCarreraTecnica.forEach((element: CarreraTecnicaElement) => {
      element.number = number;
      dataCarreraTecnica.push(element);
      number++;
    });
    this.dataSource = new MatTableDataSource<CarreraTecnicaElement>(
      dataCarreraTecnica
    );
    this.dataSource.paginator = this.paginator;
  }

  deleteCarreraTecnica(carreraid: any) {
    Swal.fire({
      title: 'Carreras Tecnicas',
      text: '¿Estas seguro eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonColor: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.carreraTecnicaService
          .deleteCarreraTecnica(carreraid)
          .subscribe((data: any) => {
            if (data.httpStatusCode == 503) {
              Swal.fire('Carreras Tecnicas', data.mensaje, 'error');
            } else {
              Swal.fire('Carreras Tecnicas', 'Registro Eliminado', 'success');
              this.getCarrerasTecnicas();
            }
          });
      }
    });
  }
}

export interface CarreraTecnicaElement {
  number: number;
  carreraid: string;
  nombre: string;
}
