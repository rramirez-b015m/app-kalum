import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JornadaComponent } from './components/jornada/jornada.component';
import { FormJornadaComponent } from './components/form-jornada/form-jornada.component';



@NgModule({
  declarations: [
    JornadaComponent,
    FormJornadaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class JornadaModule { }
