import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CarreraTecnica } from '../../carrera-tecnica/model/carrera-tecnica.model';
import { ExamenAdmision } from '../../examen-admision/model/examen-admision.model';
import { Jornada } from '../../jornada/model/jornada.model';
import { AspiranteService } from '../../shared/services/aspirante.service';
import { CarreraTecnicaService } from '../../shared/services/carrera-tecnica.service';
import { ExamenAdmisionService } from '../../shared/services/examen-admision.service';
import { JornadaService } from '../../shared/services/jornada.service';
import { Aspirante } from '../model/aspirante.model';


@Component({
  selector: 'app-form-register-aspirante',
  templateUrl: './form-register-aspirante.component.html',
  styleUrls: ['./form-register-aspirante.component.css'],
})
export class FormRegisterAspiranteComponent implements OnInit {
  aspirante: Aspirante = new Aspirante();
  public aspiranteFormRegister: FormGroup;
  carrerasTecnicas: CarreraTecnica[] = [];
  jornadas: Jornada[] = [];
  examenesAdmision: ExamenAdmision[] = [];

  ngOnInit(): void {
    this.getCarrerasTecnicas();
    this.getJornadas();
    this.getExamenAdmision();
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormRegisterAspiranteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carreraTecnicaServices: CarreraTecnicaService,
    private jornadaService: JornadaService, 
    private examenesAdmisionService: ExamenAdmisionService,
    private aspiranteService: AspiranteService
  ) {
    this.aspiranteFormRegister = this.formBuilder.group({
      apellidos: [data != null ? data.apellidos : '', Validators.required],
      nombres: [data != null ? data.nombres : '', Validators.required],
      email: [data != null ? data.email : '', Validators.required],
      telefono: [data != null ? data.telefono : '', Validators.required],
      direccion: [data != null ? data.direccion : '', Validators.required],
      carreraId: [data != null ? data.carreraId : '', Validators.required],
      examenId: ['', Validators.required],
      jornadaId: ['', Validators.required],
    });
  }

  getExamenAdmision(){
    this.examenesAdmisionService.getExamenAdmision().subscribe((data:any)=>{
      this.examenesAdmision = data; 
    },(error:any)=>{
      console.log(error)
    });

  }

  getJornadas(){
    this.jornadaService.getJornadas().subscribe((data: any)=>{
      this.jornadas = data;
    },(error:any)=>{
      console.log(error);
    })
  }

  getCarrerasTecnicas(){
    this.carreraTecnicaServices.getCarrerasTecnicas().subscribe((data:any)=>{
      this.carrerasTecnicas = data;
    },(error:any)=>{
      console.log(error);
    })
   
  }

  onSave() {
    this.aspirante.apellidos = this.aspiranteFormRegister.get('apellidos')?.value;
    this.aspirante.nombres = this.aspiranteFormRegister.get('nombres')?.value;
    this.aspirante.direccion = this.aspiranteFormRegister.get('direccion')?.value;
    this.aspirante.telefono = this.aspiranteFormRegister.get('telefono')?.value;
    this.aspirante.email = this.aspiranteFormRegister.get('email')?.value;    
    this.aspirante.carreraId = this.aspiranteFormRegister.get('carreraId')?.value;
    this.aspirante.examenId = this.aspiranteFormRegister.get('examenId')?.value;
    this.aspirante.jornadaId = this.aspiranteFormRegister.get('jornadaId')?.value;
    this.aspiranteService.addAspirante(this.aspirante).subscribe((response: any)=>{
      if(response.estatus == "OK"){

        Swal.fire({
          icon: 'success',
          title: 'Solicitud de creacion de aspirante',
          text: response.mensaje,
          footer: 'Kalum v1.0.0',
        }).then(result =>{
          this.dialogRef.close(1);
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'solicitud de creacion de aspirante',
          text: response.mensaje,
          footer: 'kalum v1.0.0'
        }).then(result =>{
          this.dialogRef.close(3)
        })

      }
    })
  }

  onClose() {
    this.dialogRef.close(2);
  }
}
