import {Inject, Injectable, InjectionToken} from '@angular/core';
import {RebootRepo} from "../interface/RebootRepo";
import {RebootValues} from "../search/search";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

// глобальная переменная для хранения URL
export const REBOOT_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})
export class RebootService implements RebootRepo<RebootValues> {

  // @ts-ignore
  constructor(@Inject(REBOOT_URL_TOKEN) public baseUrl, private http: HttpClient) {
  }

  reboot(t: RebootValues): Observable<RebootValues> {
    return this.http.post<RebootValues>(this.baseUrl + '/values', t);
  }
}
