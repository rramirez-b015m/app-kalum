import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CarreraTecnicaModule } from '../carrera-tecnica/carrera-tecnica.module';
import { LoginModule } from '../login/login.module';
import { MaterialModule } from '../shared/material.module';
import { ResultadoExamenAdmisionModule } from '../resultado-examen-admision/resultado-examen-admision.module';
import { ExamenAdmisionModule } from '../examen-admision/examen-admision.module';
import { JornadaModule } from '../jornada/jornada.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CarreraTecnicaModule,
    LoginModule,
    MaterialModule,
    ResultadoExamenAdmisionModule,
    ExamenAdmisionModule,
    JornadaModule
  ]
})
export class DashboardModule { }
