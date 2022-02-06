import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../service/token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private tokenStorageService: TokenStorageService
  ) // внедряем наше хранилище токенов в конструкторе
  {
  }

  /* этот метод вызывается при каждом http запросе */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = req;
    const token = this.tokenStorageService.getToken();
    if (token != null) {
      authRequest = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token)})
    }
    return next.handle(authRequest);
  }
}

// export const authInterceptorProviders = [
//   {
//     provide: HTTP_INTERCEPTORS,
//     useClass: AuthInterceptorService,
//     multi: true
//   }
// ]
