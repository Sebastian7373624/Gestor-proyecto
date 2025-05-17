import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { matDatepickerAnimations, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource,  MatTableModule } from '@angular/material/table';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from 'app/services/users/users.service';
import { ModalCreateUserComponent } from 'app/pages/modal-create-user/modal-create-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditUsersComponent } from 'app/pages/modal-edit-users/modal-edit-users.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Title } from 'chart.js';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

export interface User { // aqui se define la interfaz de usuario
  name: string;
}

@Component({ // Se define el selector del componente
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent { // Se define el nombre del componente

  displayedColumns: string[] = [ // Se definen las columnas de la tabla
    'name',
    'email',
    'role',
    'action'
  ];

  breadscrums = [ // Se definen las rutas de la tabla
    {
      title: 'Gestión de usuarios',
      item: [],
      active: 'Datos básicos',
    },
  ];

  breadscrumsDetails = [ // Se definen las rutas de la tabla
    { 
      title: '',
    },
  ];

  // Table
  dataSource = new MatTableDataSource<any>([]); // Se define la fuente de datos de la tabla
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // Search
  userFormSearchFilter!: FormGroup; // Se define el formulario de busqueda
  usersList: any[] = [];

  isLoading = false;

  userDefaultFilterSearch: any = {
    name: undefined,
    email: undefined,
  }
  dialog: any; // Se define el dialogo

  constructor( // Se define el constructor

    private readonly _formBuilder: FormBuilder,
    private readonly userService: UsersService,
    private readonly dialogModel: MatDialog,
    private readonly _sanckBar: MatSnackBar
  ) { }
  
  ngOnInit(): void { // Se define el metodo ngOnInit
    this.createUserFormSearchFilter();
    this.getAllUserByAdministrator();
    this.handleUserFilterChance('name', 'email');
  
  }

  createUserFormSearchFilter() { // Se define el metodo para crear el formulario de busqueda
    this.userFormSearchFilter = this._formBuilder.group({
      name: [this.userDefaultFilterSearch.name],
      email: [this.userDefaultFilterSearch.email],
    });

    this.userFormSearchFilter.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.getAllUserByAdministrator(value);
      });

  }

  // Conversor de los roles 1 y 2 a administrador y usuarios
  getRoleName(rol_id: number): string {
    switch (rol_id) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Usuario';
      default:
        return 'Desconocido';
    }

  }

  // escucha cambios utiliza dos operadores para hacer la peticion y Actualiza los filtros con lo que esta buscando el usuario
  handleUserFilterChance(controlName: string, filterKey: string) {

  }

  getAllUserByAdministrator(filters?: any): void { // Se define el metodo para obtener todos los usuarios
    this.isLoading = true;
    this.userService.getAllUserByAdministrator(filters).subscribe({
      next: (response) => {
        this.usersList = response.users;
        this.dataSource.data = response.users;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    });
  }

  openModalCreateUser(): void { // Se define el metodo para abrir el modal de crear usuario
  const dialogRef = this.dialogModel.open(ModalCreateUserComponent, {
    width: '600px',
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => { // Se define el metodo para cerrar el modal
    if (result === 'created') {
      this.getAllUserByAdministrator(); // Recarga la lista
      this._sanckBar.open('Usuario creado exitosamente', 'Cerrar', {
        duration: 3000
      });
    }
  });
  }


  openModalUpdateUser(user: any): void { // Se define el metodo para abrir el modal de editar usuario
    const dialogRef = this.dialogModel.open(ModalEditUsersComponent, {
    width: '600px',
    disableClose: true,
    data: user // Enviamos el usuario a editar
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'updated') {
      this.getAllUserByAdministrator(); // Recarga
      this._sanckBar.open('Usuario actualizado correctamente', 'Cerrar', {
        duration: 3000
      });
    }
  });
  }

  openModalDeleteUser(id: number) { // Se define el metodo para abrir el modal de eliminar usuario
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'Eliminar Usuario',
      message: '¿Estás seguro de que deseas eliminar este usuario?'
    }
  });

  dialogRef.afterClosed().subscribe((result: boolean) => { // Se define el metodo para cerrar el modal
    if (result === true) {
      console.log('Usuario con eliminado', id);
    }
  });
  }



}

  




