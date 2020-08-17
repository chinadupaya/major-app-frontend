import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getUser(userId: string){
    return this.httpClient.get(`${this.SERVER_URL}/users/${userId}`)
    .pipe(
      tap(_=> console.log('get User id ' + userId)),
      catchError(this.handleError<any>('getUser',[]))
    )
  }
  registerUser(formEmail, formFirstName, formLastName, formPassword){
    return this.httpClient.post(`${this.SERVER_URL}/users`,{
      email: formEmail,
      firstName: formFirstName,
      lastName: formLastName,
      password: formPassword
    }).pipe(
      tap(_=> console.log('registered User')),
      catchError(this.handleError<any>('registerUser',[]))
    )
  }
  loginUser(formEmail, formPassword){
    return this.httpClient.post(`${this.SERVER_URL}/login`,{
      email: formEmail,
      password: formPassword
    }).pipe(
      tap( 
        _=> {
          console.log('login User')}),
      catchError(this.handleError<any>('loginuser',[]))
    )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

