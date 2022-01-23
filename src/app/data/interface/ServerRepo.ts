import {CommonRepo} from "./CommonRepo";
import {Server} from "../../../models/Server";
import {ServerSearchValues} from "../search/search";
import {Observable} from "rxjs";

export interface ServerRepo extends CommonRepo<Server> {

  findByParams(searchValues: ServerSearchValues): Observable<Server[]>;


}
