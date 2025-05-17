import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
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

@Component({ // Se define el selector del componente
    selector: 'app-modal-create-user',
    standalone: true,
    imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatSelectModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule],
    templateUrl: './modal-create-user.component.html',
    styleUrl: './modal-create-user.component.scss'
})
export class ModalCreateUserComponent implements OnInit { // Se define el nombre del componente

    formCreateUser!: FormGroup;
    administratorValues: any [] = [];
    showFieldAdministrator: Boolean = false;
    loggedUser: any = null;


    constructor( // Se define el constructor del componente
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly _formBuilder: FormBuilder,
        private readonly _userService: UsersService,
        private readonly _dialogRef: MatDialogRef<ModalCreateUserComponent>,
        private readonly _snackBar: MatSnackBar,
    )

    {
        this.createFormUsers(); // Se llama a la funcion que crea el formulario
        this.formCreateUser.controls['confirmPassword'].valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged()
            
        ).subscribe((value)=> { // Se llama a la funcion que valida la contraseña
            this.validatePassword(value);
        });
        console.log('Ando caminando con un flow violento3')

    }

    ngOnInit(): void { // Se llama a la funcion que obtiene todos los administradores
        this.getAllAdministrator();

        const userString = localStorage.getItem('user'); // Se obtiene el usuario logueado
        if (userString) {
            this.loggedUser = JSON.parse(userString);
            this.formCreateUser.patchValue({
                administrator: this.loggedUser.id // o cualquier campo que necesites
            });
        }
    }
        
    createFormUsers() { // Se crea el formulario
        this.formCreateUser = this._formBuilder.group({
            nombre: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            role: ['', [Validators.required]],
            administrator: ['']
        });
    }

    getAllAdministrator() { // Se obtiene todos los administradores
        this._userService.getAllAdministrator().subscribe({
            next:(res) => {
                this.administratorValues = res.users;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    onChangeRole(event: any) { // Se llama a la funcion que cambia el rol
        if (event.value === '1') {
            this.hideAdministratorField();
        } else {
            this.showAdministratorField
        }
    }

    onSubmit() { // Se llama a la funcion que envia el formulario
        console.log(this.getAllAdministrator());
        if (this.formCreateUser.invalid) {
            Swal.fire('Error', 'Por favor completa todos los campos', 'error');
            return;
        }

        const userDataInformation = { // Se crea el objeto con la informacion del usuario
            name: this.formCreateUser.get('nombre')?.value,
            email: this.formCreateUser.get('email')?.value,
            password: this.formCreateUser.get('password')?.value,
            rol_id: Number(this.formCreateUser.get('role')?.value),
            administrator_id: this.formCreateUser.get('administrator_id')?.value
        };
        console.log(userDataInformation);

        this._userService.createUser(userDataInformation).subscribe({ // Se llama a la funcion que crea el usuario
            next: (Response) => {
                this._snackBar.open(Response.message, 'Cerrar', {duration: 5000});
                this.formCreateUser.reset();
                this._dialogRef.close(true);
            },
            error: (error) => {
                const errorMesage = error.error?.result || 'Ocurrio un error inesperado. Por favor intenta de nuevo.'; // Se crea el objeto con la informacion del usuario
                this._snackBar.open(error.message, 'Cerrar', {duration: 5000});
            }
        });
    }

    private validatePassword(confirmPassword: string) { // Se llama a la funcion que valida la contraseña
        const password = this.formCreateUser.get('password')?.value;
        if (password !== confirmPassword) {
            this.formCreateUser.get('confirmPassword')?.setErrors({ invalid: true });
        } else {
            this.formCreateUser.get('confirmPassword')?.setErrors(null);
        }
    }

    private showAdministratorField() { // Se llama a la funcion que muestra el campo de administrador
        this.showFieldAdministrator = true;
        this.formCreateUser.get('administrator_id')?.setValidators([Validators.required]);
        this.formCreateUser.get('administrator_id')?.updateValueAndValidity();
    }

    private hideAdministratorField() { // Se llama a la funcion que oculta el campo de administrador
        this.showFieldAdministrator = false;
        this.formCreateUser.get('administrator_id')?.clearValidators();
        this.formCreateUser.get('administrator_id')?.updateValueAndValidity();
    }
}

// function suscribe(arg0: (value: any) => void) {
//     throw new Error('Function not implemented.');
// }
