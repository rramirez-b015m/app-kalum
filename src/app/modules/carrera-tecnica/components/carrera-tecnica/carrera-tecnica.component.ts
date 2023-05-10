import { Component, OnInit } from '@angular/core';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';

@Component({
  selector: 'app-carrera-tecnica',
  templateUrl: './carrera-tecnica.component.html',
  styleUrls: ['./carrera-tecnica.component.css']
})
export class CarreraTecnicaComponent implements OnInit {
constructor(private carreraTecnicaService: CarreraTecnicaService){

}

ngOnInit(): void {
  this.getCarrerasTecnicas();
}

getCarrerasTecnicas(){
  this.carreraTecnicaService.getCarrerasTecnicas().subscribe(data => {console.log(data)})
}

}
