import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JornadaService } from 'src/app/modules/shared/services/jornada.service';

@Component({
  selector: 'app-form-jornada',
  templateUrl: './form-jornada.component.html',
  styleUrls: ['./form-jornada.component.css']
})
export class FormJornadaComponent {
  public jornadaForm: FormGroup;
  estadoFormulario: string = 'Agregar';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormJornadaComponent>,
    private jornadaService: JornadaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.jornadaForm = this.formBuilder.group({
      jornada: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    if (data != null) {
      this.estadoFormulario = 'Actualizar';
      this.updateForm(data);
    }
  }

  updateForm(data: any) {
    this.jornadaForm = this.formBuilder.group({
      jornada: [data.nombreCorto, Validators.required],
      descripcion: [data.descripcion, Validators.required],
    });
  }

  onSave() {
    if (this.jornadaForm.valid) {
      let data = {
        nombreCorto: this.jornadaForm.get('jornada')?.value,
        descripcion: this.jornadaForm.get('descripcion')?.value,
      };
      if (data != null) {
        this.jornadaService.saveJornada(data).subscribe(
          (response) => {
            this.dialogRef.close(1);
          },
          (error) => {
            this.dialogRef.close(2);
          }
        );
      }
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

}
