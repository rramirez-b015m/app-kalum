import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormJornadaComponent } from '../form-jornada/form-jornada.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Jornada } from '../../model/jornada.model';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { JornadaService } from 'src/app/modules/shared/services/jornada.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent implements OnInit {

  displayColumns: string[] = [
    'jornadaId',
    'nombreCorto',
    'descripcion',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Jornada>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public authService: AuthService,
    private jornadaService: JornadaService,
    public dialog: MatDialog
  ) {}

  getJornadas() {
    this.jornadaService.getJornadas().subscribe((data: any) => {
      this.processJornadaResponse(data);
    });
  }

  ngOnInit(): void {
    this.getJornadas();
  }

  openFormJornada() {
    const dialogRef = this.dialog.open(FormJornadaComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        Swal.fire('Jornadas', 'Registro almacenado correctamente', 'success');
        this.getJornadas();
      } else if (result === 2) {
        Swal.fire('Jornadas', 'Error al agregar el registro', 'error');
      }
    });
  }

  processJornadaResponse(data: Jornada[]) {
    this.dataSource = new MatTableDataSource<Jornada>(data);
    this.dataSource.paginator = this.paginator;
  }

  deleteJornada(jornadaId: string) {
    Swal.fire({
      title: 'Jornadas',
      text: 'Está seguro de eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.jornadaService.deleteJornada(jornadaId).subscribe((data: any) => {
          if (data.httpStatusCode == 503) {
            Swal.fire(
              'Jornadas',
              'Upps! Ocurrió un error al intentar eliminar el registro',
              'error'
            );
          } else {
            Swal.fire('Jornadas', 'Registro eliminado', 'success');
            this.getJornadas();
          }
        });
      }
    });
  }

  editJornada(jornadaId: string, nombreCorto: string, descripcion: string) {
    const dialogRef = this.dialog.open(FormJornadaComponent, {
      width: '450px',
      data: { jornadaId, nombreCorto, descripcion },
    });
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado == 1) {
        Swal.fire('Jornadas', 'Registro almacenado correctamente', 'success');
        this.getJornadas();
      } else if (resultado == 2) {
        Swal.fire(
          'Jornadas',
          'Upps! Se generó un error al intentar modificar el registro',
          'error'
        );
      }
    });
  }

}
