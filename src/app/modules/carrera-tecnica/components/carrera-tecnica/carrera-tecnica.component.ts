import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private carreraTecnicaService: CarreraTecnicaService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCarrerasTecnicas();
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
