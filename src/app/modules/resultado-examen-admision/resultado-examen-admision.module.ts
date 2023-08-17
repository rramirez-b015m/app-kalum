import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoExamenAdmisionComponent } from './components/resultado-examen-admision/resultado-examen-admision.component';
import { FormResultadoExamenAdmisionComponent } from './components/form-resultado-examen-admision/form-resultado-examen-admision.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ResultadoExamenAdmisionComponent,
    FormResultadoExamenAdmisionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ResultadoExamenAdmisionModule { }
