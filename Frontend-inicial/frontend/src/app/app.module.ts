// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Asegúrate de que exista este archivo
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { MainComponent } from './dashboard/main/main.component';

// Si AppComponent es standalone, no necesitas NgModule aquí.
// Puedes eliminar completamente este archivo o dejar solo los providers si los necesitas en bootstrapApplication.
// Por ejemplo, exporta los providers para usarlos en main.ts:
const routes: Routes = [
  { path: '', component: MainComponent }, // Página de inicio
  // otras rutas opcionales
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
