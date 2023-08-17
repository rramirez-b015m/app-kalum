import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamenAdmision } from '../../model/examen-admision.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ExamenAdmisionService } from 'src/app/modules/shared/services/examen-admision.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FormExamenAdmisionComponent } from '../form-examen-admision/form-examen-admision.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examen-admision',
  templateUrl: './examen-admision.component.html',
  styleUrls: ['./examen-admision.component.css']
})
export class ExamenAdmisionComponent implements OnInit {
  displayColumns: string[] = ['examenId', 'fechaExamen', 'acciones'];
  dataSource = new MatTableDataSource<ExamenAdmision>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public authService: AuthService,
    private examenAdmisionService: ExamenAdmisionService,
    public dialog: MatDialog
  ) {}


  getExamenesAdmision() {
    this.examenAdmisionService
      .getExamenAdmision()
      .subscribe((data: any) => {
        this.processExamenAdmisionResponse(data);
      });
  }

  ngOnInit(): void {
    this.getExamenesAdmision();
  }


  processExamenAdmisionResponse(data: ExamenAdmision[]) {
    this.dataSource = new MatTableDataSource<ExamenAdmision>(data);
    this.dataSource.paginator = this.paginator;
  }

  openFormExamenAdmision() {
    const dialogRef = this.dialog.open(FormExamenAdmisionComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        Swal.fire(
          'Exámenes de Admisión',
          'Registro almacenado correctamente',
          'success'
        );
        this.getExamenesAdmision();
      } else if (result === 2) {
        Swal.fire(
          'Exámenes de Admisión',
          'Error al agregar el registro',
          'error'
        );
      }
    });
  }

  deleteExamenAdmision(examenId: string) {
    Swal.fire({
      title: 'Exámenes de Admisión',
      text: 'Está seguro de eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenAdmisionService
          .deleteExamenAdmision(examenId)
          .subscribe((data: any) => {
            if (data.httpStatusCode == 503) {
              Swal.fire(
                'Exámenes de Admisión',
                'Upps! Ocurrió un error al intentar eliminar el registro',
                'error'
              );
            } else {
              Swal.fire(
                'Exámenes de Admisión',
                'Registro eliminado',
                'success'
              );
              this.getExamenesAdmision();
            }
          });
      }
    });
  }

  editExamenAdmision(examenId: string, fechaExamen: string) {
    const dialogRef = this.dialog.open(FormExamenAdmisionComponent, {
      width: '450px',
      data: { examenId, fechaExamen },
    });
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado == 1) {
        Swal.fire(
          'Exámenes de Admisión',
          'Registro almacenado correctamente',
          'success'
        );
        this.getExamenesAdmision();
      } else if (resultado == 2) {
        Swal.fire(
          'Exámenes de Admisión',
          'Upps! Se generó un error al intentar modificar el registro',
          'error'
        );
      }
    });
  }

}
