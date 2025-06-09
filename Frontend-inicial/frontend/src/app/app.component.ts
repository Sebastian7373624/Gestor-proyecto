import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentUrl!: string;

  // Usuarios y formulario
  usuarios: any[] = [];
  filtro: string = '';
  userFormEnabled: boolean = false;
  usuarioEditandoIndex: number | null = null;

  projectForm: FormGroup;

  // Nuevas interacciones
  contador: number = 0;
  nuevaNota: string = '';
  notas: string[] = [];
  tema: 'claro' | 'oscuro' = 'claro';
  horaActual: Date = new Date();

  constructor(public _router: Router, private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: [''],
      rol: ['', Validators.required],
    });

    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.currentUrl = routerEvent.url.substring(routerEvent.url.lastIndexOf('/') + 1);
      }
      if (routerEvent instanceof NavigationEnd) {
        /* empty */
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {
    setInterval(() => {
      this.horaActual = new Date();
    }, 1000);
  }

  // Métodos para usuarios
  usuariosFiltrados() {
    if (!this.filtro.trim()) return this.usuarios;
    return this.usuarios.filter(u => u.nombre.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  asignarUsuarioNuevo() {
    this.userFormEnabled = true;
    this.usuarioEditandoIndex = null;
    this.projectForm.reset();
  }

  onSubmit() {
    if (this.projectForm.invalid) return;
    const usuarioData = this.projectForm.value;

    if (this.usuarioEditandoIndex !== null) {
      this.usuarios[this.usuarioEditandoIndex] = usuarioData;
    } else {
      this.usuarios.push(usuarioData);
    }
    this.userFormEnabled = false;
    this.usuarioEditandoIndex = null;
  }

  editarUsuario(index: number) {
    this.usuarioEditandoIndex = index;
    this.userFormEnabled = true;
    this.projectForm.setValue(this.usuarios[index]);
  }

  eliminarUsuario(index: number) {
    this.usuarios.splice(index, 1);
  }

  cancelarEdicion() {
    this.userFormEnabled = false;
    this.usuarioEditandoIndex = null;
  }

  // Nuevas funcionalidades

  incrementarContador() {
    this.contador++;
  }

  decrementarContador() {
    if (this.contador > 0) this.contador--;
  }

  agregarNota() {
    if (this.nuevaNota.trim() !== '') {
      this.notas.push(this.nuevaNota.trim());
      this.nuevaNota = '';
    }
  }

  eliminarNota(index: number) {
    this.notas.splice(index, 1);
  }

  cambiarTema(nuevoTema: 'claro' | 'oscuro') {
    this.tema = nuevoTema;
    if (nuevoTema === 'oscuro') {
      document.body.style.backgroundColor = '#222';
      document.body.style.color = '#eee';
    } else {
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#000';
    }
  }
}
