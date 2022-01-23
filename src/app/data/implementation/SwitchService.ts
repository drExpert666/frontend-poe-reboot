import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CommonService} from "./CommonService";
import {SwitchRepo} from "../interface/SwitchRepo";
import {Switch} from "../../../models/Switch";
import {HttpClient} from "@angular/common/http";


// глобальная переменная для хранения URL
export const SWITCH_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})

export class SwitchService extends CommonService<Switch> implements SwitchRepo{

  // @ts-ignore
  constructor(@Inject(SWITCH_URL_TOKEN) baseUrl, http: HttpClient) {
    super(baseUrl, http);
  }

}
