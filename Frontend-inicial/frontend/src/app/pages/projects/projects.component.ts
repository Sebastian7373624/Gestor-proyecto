import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Usuario {
  nombre: string;
  apellidos: string;
  edad: number;
  sexo: string;
  tipoSangre: string;
  cedula: string;
  telefono: string;
  correo: string;
  eps: string;
  fechaNacimiento: string;
  paciente: string;
  alergias: string;
  antecedentes: string;
  medicamentos: string;
  ultimaConsulta: string;
  diagnosticoActual: string;
  tratamiento: string;
  nombrePaciente: string;
  edadReceta: number;
  sexoReceta: string;
  fechaReceta: string;
  diagnosticoReceta: string;
  medicamento: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
  firma: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="container">
    <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
      <!-- Información General -->
      <section>
        <h2>Información General</h2>
        <!-- Campos del formulario -->
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input id="nombre" type="text" formControlName="nombre" />
        </div>
        <div class="form-group">
          <label for="apellidos">Apellidos:</label>
          <input id="apellidos" type="text" formControlName="apellidos" />
        </div>
        <div class="form-group">
          <label for="edad">Edad:</label>
          <input id="edad" type="number" formControlName="edad" />
        </div>
        <div class="form-group">
          <label for="sexo">Sexo:</label>
          <input id="sexo" type="text" formControlName="sexo" />
        </div>
        <div class="form-group">
          <label for="tipoSangre">Tipo de sangre:</label>
          <input id="tipoSangre" type="text" formControlName="tipoSangre" />
        </div>
        <div class="form-group">
          <label for="cedula">Cédula:</label>
          <input id="cedula" type="text" formControlName="cedula" />
        </div>
        <div class="form-group">
          <label for="telefono">Teléfono:</label>
          <input id="telefono" type="tel" formControlName="telefono" />
        </div>
        <div class="form-group">
          <label for="correo">Correo electrónico:</label>
          <input id="correo" type="email" formControlName="correo" />
        </div>
        <div class="form-group">
          <label for="eps">EPS:</label>
          <input id="eps" type="text" formControlName="eps" />
        </div>
        <div class="form-group">
          <label for="fechaNacimiento">Fecha de nacimiento:</label>
          <input id="fechaNacimiento" type="date" formControlName="fechaNacimiento" />
        </div>
      </section>
      

      <!-- Historial Médico -->
      <section>
        <h2>Historial Médico</h2>
        <div class="form-group">
          <label for="paciente">Paciente:</label>
          <input id="paciente" type="text" formControlName="paciente" />
        </div>
        <div class="form-group">
          <label for="alergias">Alergias:</label>
          <input id="alergias" type="text" formControlName="alergias" />
        </div>
        <div class="form-group">
          <label for="antecedentes">Antecedentes médicos:</label>
          <input id="antecedentes" type="text" formControlName="antecedentes" />
        </div>
        <div class="form-group">
          <label for="medicamentos">Medicamentos actuales:</label>
          <input id="medicamentos" type="text" formControlName="medicamentos" />
        </div>
        <div class="form-group">
          <label for="ultimaConsulta">Fecha de última consulta:</label>
          <input id="ultimaConsulta" type="date" formControlName="ultimaConsulta" />
        </div>
        <div class="form-group">
          <label for="diagnosticoActual">Diagnóstico actual:</label>
          <input id="diagnosticoActual" type="text" formControlName="diagnosticoActual" />
        </div>
        <div class="form-group">
          <label for="tratamiento">Tratamiento médico:</label>
          <input id="tratamiento" type="text" formControlName="tratamiento" />
        </div>
      </section>

      <!-- Receta Médica -->
      <section>
        <h2>Receta Médica</h2>
        <div class="form-group">
          <label for="nombrePaciente">Nombre del paciente:</label>
          <input id="nombrePaciente" type="text" formControlName="nombrePaciente" />
        </div>
        <div class="form-group">
          <label for="edadReceta">Edad:</label>
          <input id="edadReceta" type="number" formControlName="edadReceta" />
        </div>
        <div class="form-group">
          <label for="sexoReceta">Sexo:</label>
          <input id="sexoReceta" type="text" formControlName="sexoReceta" />
        </div>
        <div class="form-group">
          <label for="fechaReceta">Fecha:</label>
          <input id="fechaReceta" type="date" formControlName="fechaReceta" />
        </div>
        <div class="form-group">
          <label for="diagnosticoReceta">Diagnóstico:</label>
          <input id="diagnosticoReceta" type="text" formControlName="diagnosticoReceta" />
        </div>
        <div class="form-group">
          <label for="medicamento">Medicamento recetado:</label>
          <input id="medicamento" type="text" formControlName="medicamento" />
        </div>
        <div class="form-group">
          <label for="dosis">Dosis:</label>
          <input id="dosis" type="text" formControlName="dosis" />
        </div>
        <div class="form-group">
          <label for="frecuencia">Frecuencia:</label>
          <input id="frecuencia" type="text" formControlName="frecuencia" />
        </div>
        <div class="form-group">
          <label for="duracion">Duración del tratamiento:</label>
          <input id="duracion" type="text" formControlName="duracion" />
        </div>
        <div class="form-group">
          <label for="firma">Firma del médico:</label>
          <input id="firma" type="text" formControlName="firma" />
        </div>
      </section>

      <button type="submit" [disabled]="projectForm.invalid">Crear Usuario</button>
    </form>

    <hr />

    <h2>Usuarios creados</h2>
    <table *ngIf="usuarios.length > 0" class="tabla-usuarios">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Edad</th>
          <th>Sexo</th>
          <th>Cédula</th>
          <th>Correo</th>
          <th>EPS</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of usuarios; let i = index">
          <td>{{ user.nombre }}</td>
          <td>{{ user.apellidos }}</td>
          <td>{{ user.edad }}</td>
          <td>{{ user.sexo }}</td>
          <td>{{ user.cedula }}</td>
          <td>{{ user.correo }}</td>
          <td>{{ user.eps }}</td>
          <td>
            <button (click)="eliminarUsuario(i)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styles: [`
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 32px 16px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      color: #333;
    }
    section {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
    }
    h2 {
      font-weight: 700;
      font-size: 1.2rem;
      margin-bottom: 15px;
      color: #0D47A1;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 6px;
    }
    input {
      width: 100%;
      padding: 6px 8px;
      border-radius: 6px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 400;
    }
    button {
      background-color: #0D47A1;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      cursor: pointer;
      font-weight: 700;
      font-size: 14px;
      margin-top: 15px;
    }
    button[disabled] {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .tabla-usuarios {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .tabla-usuarios th,
    .tabla-usuarios td {
      border: 1px solid #ddd;
      padding: 10px 8px;
      text-align: left;
      font-size: 13px;
    }
    .tabla-usuarios th {
      background-color: #0D47A1;
      color: white;
    }
  `]
})
export class ProjectsComponent {
  projectForm: FormGroup;
  usuarios: Usuario[] = [];

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: [null, Validators.required],
      sexo: ['', Validators.required],
      tipoSangre: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      eps: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      paciente: ['', Validators.required],
      alergias: ['', Validators.required],
      antecedentes: ['', Validators.required],
      medicamentos: ['', Validators.required],
      ultimaConsulta: ['', Validators.required],
      diagnosticoActual: ['', Validators.required],
      tratamiento: ['', Validators.required],
      nombrePaciente: ['', Validators.required],
      edadReceta: [null, Validators.required],
      sexoReceta: ['', Validators.required],
      fechaReceta: ['', Validators.required],
      diagnosticoReceta: ['', Validators.required],
      medicamento: ['', Validators.required],
      dosis: ['', Validators.required],
      frecuencia: ['', Validators.required],
      duracion: ['', Validators.required],
      firma: ['', Validators.required]
    });

    // Cargar desde localStorage al iniciar
    const storedUsuarios = localStorage.getItem('usuarios');
    if (storedUsuarios) {
      this.usuarios = JSON.parse(storedUsuarios);
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const nuevoUsuario: Usuario = this.projectForm.value;
      this.usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      this.projectForm.reset();
    }
  }

  eliminarUsuario(index: number): void {
    this.usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }
}
