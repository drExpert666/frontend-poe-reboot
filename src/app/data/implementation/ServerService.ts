import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CommonService} from "./CommonService";
import {Server} from "../../../models/Server";
import {HttpClient} from "@angular/common/http";
import {ServerRepo} from "../interface/ServerRepo";
import {ServerSearchValues} from "../search/search";
import {Observable} from "rxjs";


// глобальная переменная для хранения URL
export const SERVER_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})


export class ServerService extends CommonService<Server> implements ServerRepo{

  //ts-ignore
  constructor(@Inject(SERVER_URL_TOKEN)private baseUrl: string,private http: HttpClient) {
    super(baseUrl, http);
  }

  findByParams(searchValues: ServerSearchValues): Observable<Server[]> {
    console.log(searchValues);
   return this.http.post<Server[]>(this.baseUrl + "/search", searchValues);
  }
}
