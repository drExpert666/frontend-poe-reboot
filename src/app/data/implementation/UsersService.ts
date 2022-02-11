import {Inject, Injectable, InjectionToken} from '@angular/core';
import {RebootRepo} from "../interface/RebootRepo";
import {RebootValues, UsersValues} from "../search/search";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UsersRepo} from "../interface/UsersRepo";

// глобальная переменная для хранения URL
export const USERS_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})
export class UsersService implements UsersRepo<UsersValues> {

  // @ts-ignore
  constructor(@Inject(USERS_URL_TOKEN) public baseUrl, private http: HttpClient) {
  }

  find(t: UsersValues): Observable<UsersValues[]> {
    return this.http.get<UsersValues[]>(this.baseUrl + '/find/' + t.channelGuid);
  }
}
