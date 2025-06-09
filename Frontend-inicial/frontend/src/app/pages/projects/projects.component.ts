import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  tema: any;
  horaActual: string | number | Date | undefined;

  notas: string[] = [];       // Lista para notas rápidas
  nuevaNota: string = '';     // Texto para la nueva nota

  contador: number = 0;

  projectForm: FormGroup;
  usuarios: any[] = [];
  userFormEnabled = false;
  filtro: string = '';
  usuarioEditandoIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: [''],
      rol: ['']
    });
  }

  ngOnInit(): void {
    const savedUsers = localStorage.getItem('usuarios');
    if (savedUsers) {
      this.usuarios = JSON.parse(savedUsers);
    }
  }

  asignarUsuarioNuevo(): void {
    this.userFormEnabled = true;
    this.projectForm.reset();
    this.usuarioEditandoIndex = null;
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const data = this.projectForm.value;

      if (this.usuarioEditandoIndex !== null) {
        this.usuarios[this.usuarioEditandoIndex] = data;
        this.usuarioEditandoIndex = null;
      } else {
        this.usuarios.push(data);
      }

      this.guardarUsuariosEnLocalStorage();
      this.projectForm.reset();
      this.userFormEnabled = false;
    } else {
      this.projectForm.markAllAsTouched();
    }
  }

  editarUsuario(index: number): void {
    this.projectForm.patchValue(this.usuarios[index]);
    this.userFormEnabled = true;
    this.usuarioEditandoIndex = index;
  }

  cancelarEdicion(): void {
    this.usuarioEditandoIndex = null;
    this.projectForm.reset();
    this.userFormEnabled = false;
  }

  eliminarUsuario(index: number): void {
    const confirmado = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmado) {
      this.usuarios.splice(index, 1);
      this.guardarUsuariosEnLocalStorage();
    }
  }

  guardarUsuariosEnLocalStorage(): void {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  usuariosFiltrados(): any[] {
    if (!this.filtro.trim()) return this.usuarios;
    const filtroLower = this.filtro.toLowerCase();
    return this.usuarios.filter(user =>
      Object.values(user).some(val =>
        String(val).toLowerCase().includes(filtroLower)
      )
    );
  }

  // Funciones para las notas rápidas

  agregarNota(): void {
    const notaTrim = this.nuevaNota.trim();
    if (notaTrim) {
      this.notas.push(notaTrim);
      this.nuevaNota = '';
    }
  }

  eliminarNota(index: number): void {
    this.notas.splice(index, 1);
  }

  // Puedes agregar aquí otras funciones como cambiarTema, decrementarContador, etc. si las usas.
}
