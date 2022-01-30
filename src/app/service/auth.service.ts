import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/User";


const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    console.log('constructor() AuthService')
  }

  public login(user: User): Observable<any> {
    console.log('login() AuthService')
    return this.http.post(AUTH_API + 'signin', {
      username: user.username,
      password: user.password
    });
  }

}
