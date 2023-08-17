import { Component, Inject } from '@angular/core';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamenAdmisionService } from 'src/app/modules/shared/services/examen-admision.service';

@Component({
  selector: 'app-form-examen-admision',
  templateUrl: './form-examen-admision.component.html',
  styleUrls: ['./form-examen-admision.component.css']
})
export class FormExamenAdmisionComponent {
  public examenAdmisionForm: FormGroup;
  estadoFormulario: string = 'Agregar';

  constructor(
    private FormBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormExamenAdmisionComponent>,
    private examenAdmisionService: ExamenAdmisionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.examenAdmisionForm = this.FormBuilder.group({
      fechaExamen: ['', Validators.required],
    });

    if (data != null) {
      this.estadoFormulario = 'Actualizar';
      this.updateForm(data);
    }
  }

  updateForm(data: any) {
    this.examenAdmisionForm = this.FormBuilder.group({
      fechaExamen: [data.fechaExamen, Validators.required],
    });
  }

  onSave() {
    if (this.examenAdmisionForm.valid) {
      let data = {
        fechaExamen: this.examenAdmisionForm.get('fechaExamen')?.value,
      };
      if (data != null) {
        this.examenAdmisionService.saveExamenAdmision(data).subscribe(
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
