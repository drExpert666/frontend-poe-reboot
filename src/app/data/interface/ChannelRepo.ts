import {CommonRepo} from "./CommonRepo";
import {Channel} from "../../../models/Channel";
import {ChannelSearchValues} from "../search/search";
import {Observable} from "rxjs";

export interface ChannelRepo extends CommonRepo<Channel> {

  findByParams(channelSearchValues: ChannelSearchValues): Observable<Channel[]>;

}
