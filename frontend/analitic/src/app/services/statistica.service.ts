import { Skills } from './../models/Skills';
import { Base } from './../models/Base';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'Accept': 'application/json;charset=utf-8',
  'Access-Control-Allow-Origin': '*'})
};
const headers = new HttpHeaders({ 'Content-Type': 'application/json',
  'Accept': 'application/json;charset=utf-8',
  'Access-Control-Allow-Origin': '*'});

const skillsByText = 'http://localhost:8080/api/statistica/skills';
const createGetRequest = 'http://localhost:8080/api/statistica/request';
const locations = 'http://localhost:8080/api/statistica/locations';

@Injectable({
  providedIn: 'root'
})
export class StatisticaService {

  index: number;

  constructor(private http: HttpClient) {
    this.index = 1;
  }

  public createRequest(query: string,
                         salaryStart: string,
                         salaryUntil: string,
                         limit: string){
    let params = new HttpParams();
    params = params.append('text', query);
    params = params.append('salaryStart', salaryStart);
    params = params.append('salaryUntil', salaryUntil);
    params = params.append('limit', limit);

    this.http.post(createGetRequest + '?' + params.toString(), null, httpOptions)
    .pipe(
      catchError(this.handleError)
    ).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
    });
  }

  /*public getSkillsByText(id: number): Skills[] {
    let skillArray: Skills[];
    this.getSkillsByText(id).subscribe(skills => {

      skillArray = new Array();
    });
    return skillArray;
  }*/

  public getSkillsByText(id: number): Observable<Skills[]> {
    this.index = id;
    return this.http.get<Skills[]>(skillsByText+'?rownum='+id, {headers})
    .pipe(
      tap(data => this.log('fetched requirements')),
      catchError(this.handleError)
    );
  }

  public getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(createGetRequest, {headers})
    .pipe(
      tap(data => this.log('fetched requests')),
      catchError(this.handleError)
    );
  }

  public getLocations(): Observable<Base[]> {
    return this.http.get<Base[]>(locations, {headers})
    .pipe(
      tap(data => this.log('fetched locations')),
      catchError(this.handleError)
    );
  }
  /*private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {
        //this.auth.logout();
        return of(result as T);
      }
    };
  }*/

  private log(message: string) {
    console.log(message);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
