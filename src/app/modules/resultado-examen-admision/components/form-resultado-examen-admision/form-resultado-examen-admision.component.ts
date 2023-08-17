import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultadoExamenAdmisionService } from 'src/app/modules/shared/services/resultado-examen-admision.service';

@Component({
  selector: 'app-form-resultado-examen-admision',
  templateUrl: './form-resultado-examen-admision.component.html',
  styleUrls: ['./form-resultado-examen-admision.component.css']
})
export class FormResultadoExamenAdmisionComponent {
  public resultadoExamenAdmisionForm: FormGroup;
  estadoFormulario: string = 'Agregar';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormResultadoExamenAdmisionComponent>,
    private resultadoExamenAdmisionService: ResultadoExamenAdmisionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.resultadoExamenAdmisionForm = this.formBuilder.group({
      noExpediente: ['', Validators.required],
      anio: ['', Validators.required],
      descripcion: ['', Validators.required],
      nota: [0, Validators.required],
    });

    if (data != null) {
      this.estadoFormulario = 'Actualizar';
      this.updateForm(data);
    }
  }

  updateForm(data: any) {
    this.resultadoExamenAdmisionForm = this.formBuilder.group({
      noExpediente: [data.noExpediente, Validators.required],
      anio: [data.anio, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      nota: [data.nota, Validators.required],
    });
  }

  onSave() {
    if (this.resultadoExamenAdmisionForm.valid) {
      let data = {
        noExpediente:
          this.resultadoExamenAdmisionForm.get('noExpediente')?.value,
        anio: this.resultadoExamenAdmisionForm.get('anio')?.value,
        descripcion: this.resultadoExamenAdmisionForm.get('descripcion')?.value,
        nota: this.resultadoExamenAdmisionForm.get('nota')?.value,
      };

      if (this.estadoFormulario === 'Actualizar') {
        this.resultadoExamenAdmisionService
          .updateResultadoExamenAdmision(this.data.carreraId, data)
          .subscribe({
            next: (data) => this.dialogRef.close(1),
            error: (error) => this.dialogRef.close(2),
            complete: () => console.log('Proceso finalizado'),
          });
      } else {
        this.resultadoExamenAdmisionService
          .saveResultadoExamenAdmision(data)
          .subscribe({
            next: (data) => this.dialogRef.close(1),
            error: (error) => this.dialogRef.close(2),
            complete: () => console.log('Proceso finalizado'),
          });
      }
    }
  }
  onCancel() {
    this.dialogRef.close(3);
  }

}
