import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

/** класс-место для хранения токенов */
export class TokenStorageService {

  constructor() {
    console.log("constructor()TokenStorageService")
  }

  public saveToken(token: string): void {
    console.log("saveToken()")
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    console.log("getToken()");
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: string): void {
    console.log("saveUser()");
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
  }

  public getUser(): any {
    console.log("getUser()")
    return sessionStorage.getItem(USER_KEY);
  }

  logOut(): void {
    console.log("logOut()");
    window.sessionStorage.clear(); // удаляем из браузера инфу о пользователе (токен)
    window.location.reload();
  }

}
