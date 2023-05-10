import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarreraTecnicaComponent } from './components/carrera-tecnica/carrera-tecnica.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CarreraTecnicaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class CarreraTecnicaModule { }
