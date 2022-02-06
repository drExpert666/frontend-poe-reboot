import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenStorageService} from "../service/token-storage.service";
import {NotificationService} from "../service/notification.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenStorageService,
    private notificationService: NotificationService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {// если получена от сервера ошибка 401 (ошибка авторизации)
        this.tokenService.logOut(); // вызываем метод логаут
      }

      const error = err.errorMessage || err.statusText;
      this.notificationService.showSnack(error);
      return throwError(error);
    }));
  }
}

/** provide: HTTP_INTERCEPTORS в декораторе модуля связывает интерфейс с реализацией
 *  (useClass: ErrorInterceptorService в нашем случае) и далее мы можем получить экземпляры наших реализаций указав
 *  в качестве параметра константу HTTP_INTERCEPTORS */
// export const authErrorInterceptorProviders = [
//   {
//     provide: HTTP_INTERCEPTORS,
//     userClass: ErrorInterceptorService,
//     multi: true
//   }
// ];
