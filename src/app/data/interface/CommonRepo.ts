import {Observable} from "rxjs";

export interface CommonRepo<T> {

  /** все CRUD операции */

  add(t: T): Observable<T>;

  findById(id: number): Observable<T>;

  delete(id: number): Observable<T>;

  update(t: T): Observable<T>;

  findAll(): Observable<T[]>;

}
