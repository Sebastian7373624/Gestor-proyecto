import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-project',
  templateUrl: './modal-edit-project.component.html',
})
export class ModalEditProjectComponent implements OnInit {
  editForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalEditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      nombre: [this.data.nombre, Validators.required],
      descripcion: [this.data.descripcion],
    });
  }

  save(): void {
    if (this.editForm && this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
