import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('accessToken');
    // Verifica si el token existe en sessionStorage

    console.log('Token encontrado:', token); // Verifica que el token exista

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      console.log('Petición con token:', cloned); // Verifica que el token se está enviando
      return next.handle(cloned);
    }

    console.log('Petición sin token:', req); // Si no hay token
    return next.handle(req);
  }
}
