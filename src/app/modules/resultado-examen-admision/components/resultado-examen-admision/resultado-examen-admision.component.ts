import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { ResultadoExamenAdmisionService } from 'src/app/modules/shared/services/resultado-examen-admision.service';
import Swal from 'sweetalert2';
import { ResultadoExamenAdmision } from '../../model/resultado-examen-admision';
import { FormResultadoExamenAdmisionComponent } from '../form-resultado-examen-admision/form-resultado-examen-admision.component';

@Component({
  selector: 'app-resultado-examen-admision',
  templateUrl: './resultado-examen-admision.component.html',
  styleUrls: ['./resultado-examen-admision.component.css'],
})
export class ResultadoExamenAdmisionComponent implements OnInit {
  displayColumns: string[] = [
    'number',
    'noExpediente',
    'anio',
    'descripcion',
    'nota',
    'acciones',
  ];
  dataSource = new MatTableDataSource<ResultadoExamenAdmision>();
  pipe = new DatePipe('en-US');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public authService: AuthService,
    private resultadoExamenAdmisionService: ResultadoExamenAdmisionService,
    public dialog: MatDialog
  ) {}

  getResultadosExamenesAdmisiones() {
    this.resultadoExamenAdmisionService
      .getResultadosExamenesAdmisiones()
      .subscribe((data) => {
        console.log(data);
        this.processResultadoExamenAdmisionResponse(data);
      });
  }

  ngOnInit(): void {
    this.getResultadosExamenesAdmisiones();
  }

  openFormResultadoExamenAdmision() {
    const dialogRef = this.dialog.open(FormResultadoExamenAdmisionComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        Swal.fire(
          'Resultados Exámenes de Admisión',
          'Registro almacenado correctamente',
          'success'
        );
        this.getResultadosExamenesAdmisiones();
      } else if (result === 2) {
        Swal.fire(
          'Resultados Exámenes de Admisión',
          'Error al agregar el registro',
          'error'
        );
      }
    });
  }

  processResultadoExamenAdmisionResponse(data: any) {
    this.dataSource = new MatTableDataSource<ResultadoExamenAdmision>(data);
    this.dataSource.paginator = this.paginator;
  }

  deleteResultadoExamenAdmision(noExpediente: string) {
    Swal.fire({
      title: 'Resultados Exámenes de Admisión',
      text: 'Está seguro de eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.resultadoExamenAdmisionService
          .deleteResultadoExamenAdmision(noExpediente)
          .subscribe((data: any) => {
            if (data.httpStatusCode == 503) {
              Swal.fire(
                'Resultados Exámenes de Admisión',
                'Upps! Se generó un error al intentar eliminar el registro',
                'error'
              );
            } else {
              Swal.fire(
                'Resultados Exámenes de Admisión',
                'Registro eliminado',
                'success'
              );
              this.getResultadosExamenesAdmisiones();
            }
          });
      }
    });
  }

  editResultadoExamenAdmision(
    noExpediente: string,
    anio: string,
    descripcion: string,
    nota: number
  ) {
    const dialogRef = this.dialog.open(FormResultadoExamenAdmisionComponent, {
      width: '450px',
      data: { noExpediente, anio, descripcion, nota },
    });
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado == 1) {
        Swal.fire(
          'Resultados Exámenes de Admisión',
          'Registro almacenado correctamente',
          'success'
        );
        this.getResultadosExamenesAdmisiones();
      } else if (resultado == 2) {
        Swal.fire(
          'Resultados Exámenes de Admisión',
          'Upps! Se generó un error al intentar modificar el registro',
          'error'
        );
      }
    });
  }
}
