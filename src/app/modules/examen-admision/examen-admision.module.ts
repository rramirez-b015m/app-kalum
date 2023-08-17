import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormExamenAdmisionComponent } from './components/form-examen-admision/form-examen-admision.component';
import { ExamenAdmisionComponent } from './components/examen-admision/examen-admision.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamenAdmision } from './model/examen-admision.model';

@NgModule({
  declarations: [ExamenAdmisionComponent, FormExamenAdmisionComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ExamenAdmisionModule {}
