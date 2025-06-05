import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { UsersService } from 'app/services/users/users.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-modal-create-user',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    templateUrl: './modal-create-user.component.html',
    styleUrl: './modal-create-user.component.scss'
})
export class ModalCreateUserComponent implements OnInit {

    formCreateUser!: FormGroup;
    administratorValues: any[] = [];
    showFieldAdministrator: boolean = false;
    loggedUser: any = null;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly _formBuilder: FormBuilder,
        private readonly _userService: UsersService,
        private readonly _dialogRef: MatDialogRef<ModalCreateUserComponent>,
        private readonly _snackBar: MatSnackBar
    ) {
        this.createFormUsers();

        this.formCreateUser.controls['confirmPassword'].valueChanges
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe((value) => {
                this.validatePassword(value);
            });
    }

    ngOnInit(): void {
        this.getAllAdministrator();

        const userString = localStorage.getItem('user');
        if (userString) {
            this.loggedUser = JSON.parse(userString);
            this.formCreateUser.patchValue({
                administrator: this.loggedUser.id
            });
        }
    }

    createFormUsers() {
        this.formCreateUser = this._formBuilder.group({
            nombre: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            role: ['', Validators.required],
            administrator_id: ['']
        });
    }

    getAllAdministrator() {
        this._userService.getAllAdministrator().subscribe({
            next: (res) => {
                this.administratorValues = res.users;
            },
            error: (err) => {
                console.error('Error al obtener los administradores:', err);
                Swal.fire('Error', 'No se pudieron cargar los administradores', 'error');
            }
        });
    }

    onChangeRole(event: any) {
        if (event.value === '1') {
            this.hideAdministratorField();
        } else {
            this.showAdministratorField();
        }
    }

   onSubmit() {
  if (this.formCreateUser.valid) {
    const formValue = this.formCreateUser.value;

    // Preparar el payload
    const userDataInformation: any = {
      name: formValue.nombre,
      email: formValue.email,
      password: formValue.password,
      rol_id: +formValue.role
    };

    // Solo incluir administrator_id si fue asignado y no está vacío
    if (formValue.administrator_id) {
      userDataInformation.administrator_id = formValue.administrator_id;
    }

    this._userService.createUser(userDataInformation).subscribe({
      next: (response) => {
        this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.formCreateUser.reset();
        this._dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error.error?.result || 'Error al crear usuario.';
        this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }
}



    private validatePassword(confirmPassword: string) {
        const password = this.formCreateUser.get('password')?.value;
        if (password !== confirmPassword) {
            this.formCreateUser.get('confirmPassword')?.setErrors({ invalid: true });
        } else {
            this.formCreateUser.get('confirmPassword')?.setErrors(null);
        }
    }

    private showAdministratorField() {
        this.showFieldAdministrator = true;
        this.formCreateUser.get('administrator_id')?.setValidators([Validators.required]);
        this.formCreateUser.get('administrator_id')?.updateValueAndValidity();
    }

    private hideAdministratorField() {
        this.showFieldAdministrator = false;
        this.formCreateUser.get('administrator_id')?.clearValidators();
        this.formCreateUser.get('administrator_id')?.updateValueAndValidity();
    }
}
