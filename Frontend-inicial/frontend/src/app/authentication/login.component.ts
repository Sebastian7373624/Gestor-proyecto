import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:3000/api/v1/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {
      sessionStorage.setItem('token', res.token); // 👈 Muy importante
      this.router.navigate(['/dashboard']); // O adonde quieras redirigir
    }, err => {
      console.error('Error de login:', err);
    });
  }
}
