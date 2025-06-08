// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component'; // Asegúrate de que exista este archivo
import { AuthInterceptor } from './core/interceptor/auth.interceptor';

// Si AppComponent es standalone, no necesitas NgModule aquí.
// Puedes eliminar completamente este archivo o dejar solo los providers si los necesitas en bootstrapApplication.
// Por ejemplo, exporta los providers para usarlos en main.ts:

export const appProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
