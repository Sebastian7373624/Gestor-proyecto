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
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
    }
    label {
      font-weight: 700;
      margin-bottom: 5px;
    }
    input[type="text"],
    input[type="number"],
    input[type="email"],
    input[type="tel"],
    input[type="date"] {
      padding: 8px 12px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      transition: border-color 0.3s;
    }
    input:focus {
      border-color: #0D47A1;
      outline: none;
    }
    button {
      padding: 12px 24px;
      background-color: #0D47A1;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-top: 10px;
    }
    button:disabled {
      background-color: #9E9E9E;
      cursor: not-allowed;
    }
    button:hover:not(:disabled) {
      background-color: #08397f;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 10px 15px;
      text-align: left;
    }
    th {
      background-color: #0D47A1;
      color: white;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
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
      edad: [null, [Validators.required, Validators.min(0)]],
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
      edadReceta: [null, [Validators.required, Validators.min(0)]],
      sexoReceta: ['', Validators.required],
      fechaReceta: ['', Validators.required],
      diagnosticoReceta: ['', Validators.required],
      medicamento: ['', Validators.required],
      dosis: ['', Validators.required],
      frecuencia: ['', Validators.required],
      duracion: ['', Validators.required],
      firma: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.projectForm.invalid) return;

    this.usuarios.push(this.projectForm.value);
    this.projectForm.reset();
  }

  eliminarUsuario(index: number) {
    this.usuarios.splice(index, 1);
  }
}
