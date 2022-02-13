import {Observable} from "rxjs";

export interface UsersRepo<T> {

  find(t: T): Observable<T>;

}
