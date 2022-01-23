import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CommonService} from "./CommonService";
import {Channel} from "../../../models/Channel";
import {ChannelRepo} from "../interface/ChannelRepo";
import {HttpClient} from "@angular/common/http";
import {ChannelSearchValues} from "../search/search";
import {Observable, of} from "rxjs";

// глобальная переменная для хранения URL
export const CHANNEL_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})
export class ChannelService extends CommonService<Channel> implements ChannelRepo {

  // @ts-ignore
  constructor(@Inject(CHANNEL_URL_TOKEN) private baseUrl, private http: HttpClient) {
    super(baseUrl, http);
  }

  findByParams(channelSearchValues: ChannelSearchValues): Observable<Channel[]> {
    console.log(channelSearchValues);
    return this.http.post<Channel[]>(this.baseUrl + '/search', channelSearchValues);
  }

}
