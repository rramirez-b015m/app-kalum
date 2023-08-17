import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarreraTecnicaComponent } from '../carrera-tecnica/components/carrera-tecnica/carrera-tecnica.component';
import { FormUpdateIdentificationIdComponent } from '../login/components/form-update-identification-id.component';
import { AuthGuard } from '../usuario/model/guards/auth.guard';
import { ResultadoExamenAdmisionComponent } from '../resultado-examen-admision/components/resultado-examen-admision/resultado-examen-admision.component';
import { ExamenAdmisionComponent } from '../examen-admision/components/examen-admision/examen-admision.component';
import { JornadaComponent } from '../jornada/components/jornada/jornada.component';

const childroutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'carreraTecnica', component: CarreraTecnicaComponent },
  { path: 'jornadas', component: JornadaComponent },
  { path: 'examenAdmision', component: ExamenAdmisionComponent },
  {
    path: 'update-identification/form',
    component: FormUpdateIdentificationIdComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'resultadoExamenAdmision',
    component: ResultadoExamenAdmisionComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(childroutes)],
  exports: [RouterModule],
})
export class RouterChildModule {}
