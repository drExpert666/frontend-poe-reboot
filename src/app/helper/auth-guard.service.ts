import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {TokenStorageService} from "../service/token-storage.service";

/* сервис, проверяющий имеются ли права у нашего пользователя зайти на тот или иной url */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService) {

    console.log('constructor() AuthGuardService');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('canActivate')

    const currentUser = this.tokenStorageService.getUser();
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/login'],
      {queryParams: {returnUrl: state.url}});// если авторизированный пользователь не найден, перенаправляем на логин страницу
    return false;
  }
}
