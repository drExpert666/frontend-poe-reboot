import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CommonService} from "./CommonService";
import {Server} from "../../../models/Server";
import {HttpClient} from "@angular/common/http";
import {ServerRepo} from "../interface/ServerRepo";



// глобальная переменная для хранения URL
export const SERVER_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})


export class ServerService extends CommonService<Server> implements ServerRepo{

  constructor(@Inject(SERVER_URL_TOKEN) baseUrl: string, httpClient: HttpClient) {

    super(baseUrl, httpClient);
  }
}
