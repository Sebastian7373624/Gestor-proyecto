import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete-users',
  templateUrl: './modal-delete-users.component.html',
})
export class ModalDeleteUsersComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDeleteUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
