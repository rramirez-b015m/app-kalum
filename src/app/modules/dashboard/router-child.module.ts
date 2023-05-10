import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarreraTecnicaComponent } from '../carrera-tecnica/components/carrera-tecnica/carrera-tecnica.component';

const childroutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home',component: HomeComponent},
    {path: 'CarreraTecnica',component: CarreraTecnicaComponent}
]


@NgModule({
    imports: [RouterModule.forChild(childroutes)],
    exports: [RouterModule],
})
export class RouterChildModule { }
