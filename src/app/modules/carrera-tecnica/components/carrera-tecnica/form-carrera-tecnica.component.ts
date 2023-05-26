import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';

@Component({
  selector: 'app-form-carrera-tecnica',
  templateUrl: './form-carrera-tecnica.component.html',
  styleUrls: ['./form-carrera-tecnica.component.css'],
})
export class FormCarreraTecnicaComponent {
  public carreraTecnicaForm: FormGroup;
  estadoFormulario: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormCarreraTecnicaComponent>,
    private carreraTecnicaService: CarreraTecnicaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.carreraTecnicaForm = this.fb.group({
      carreraTecnica: ['', Validators.required],
    });
    if (data != null) {
      this.estadoFormulario = 'Actualizar';
      this.updateForm(data);
    }
  }

  updateForm(data: any) {
    this.carreraTecnicaForm = this.fb.group({
      CarreraTecnica: [data.nombre, Validators.required],
    });
  }

  onSave() {
    let data = {
      nombre: this.carreraTecnicaForm.get('carreraTecnica')?.value,
    };

    if (this.estadoFormulario === 'Actualizar') {
      this.carreraTecnicaService
        .updateCarreraTecnica(data, this.data.carreraId)
        .subscribe({
          next: (data) => this.dialogRef.close(1),
          error: (error) => this.dialogRef.close(2),
          complete: () => console.log('proceso finalizado'),
        });
    } else {
      this.carreraTecnicaService.saveCarreraTecnica(data).subscribe(
        (response) => {
          console.log(response);
          this.dialogRef.close(1);
        },
        (error) => {
          console.log(error);
          this.dialogRef.close(2);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }
}
