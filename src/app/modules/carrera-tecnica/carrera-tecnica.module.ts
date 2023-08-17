import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarreraTecnicaComponent } from './components/carrera-tecnica/carrera-tecnica.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCarreraTecnicaComponent } from './components/carrera-tecnica/form-carrera-tecnica.component';
import { AspiranteModule } from '../aspirante/aspirante.module';



@NgModule({
  declarations: [
    CarreraTecnicaComponent,
    FormCarreraTecnicaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AspiranteModule
  ]
})
export class CarreraTecnicaModule { }
