import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-create-projects',
  templateUrl: './modal-create-projects.component.html',
  // styleUrls: ['./modal-create-projects.component.scss']
})
export class ModalCreateProjectsComponent {
  formCreateProject: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCreateProjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formCreateProject = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  onSubmit() {
    if (this.formCreateProject.valid) {
      this.dialogRef.close(this.formCreateProject.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
