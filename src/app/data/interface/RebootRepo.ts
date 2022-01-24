import {Observable} from "rxjs";

export interface RebootRepo<T> {

  reboot(t: T): Observable<T>;

}
