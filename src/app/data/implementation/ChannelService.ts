import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CommonService} from "./CommonService";
import {CommonChannel} from "../../../models/CommonChannel";
import {ChannelRepo} from "../interface/ChannelRepo";
import {HttpClient} from "@angular/common/http";

// глобальная переменная для хранения URL
export const CHANNEL_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})
export class ChannelService extends CommonService<CommonChannel> implements ChannelRepo {

  // @ts-ignore
  constructor(@Inject(CHANNEL_URL_TOKEN) private baseUrl, private http: HttpClient) {
    super(baseUrl, http);
  }

}
