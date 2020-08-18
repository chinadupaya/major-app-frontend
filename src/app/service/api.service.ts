import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, first } from 'rxjs/operators';
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
  getJobs(){
    return this.httpClient.get(`${this.SERVER_URL}/jobs`)
    .pipe(
      tap(_=> console.log('get jobs')),
      catchError(this.handleError<any>('getJobs',[]))
    )
  }
  getServices(){
    return this.httpClient.get(`${this.SERVER_URL}/services`)
    .pipe(
      tap(_=> console.log('get services')),
      catchError(this.handleError<any>('getServices',[]))
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
  postJob(title,description, category, location, latitude, longitude, userId, firstName, lastName, userRating){
    return this.httpClient.post(`${this.SERVER_URL}/post-job`,{
      title: title,
      description: description,
      category: category,
      location: location,
      latitude: latitude,
      longitude:longitude,
      userId:userId,
      firstName: firstName,
      lastName: lastName,
      userRating: userRating
      })
    .pipe(
      tap( 
        _=> {
          console.log('post job')}),
      catchError(this.handleError<any>('postJob',[]))
    )
  }
  postService(title, description, category, priceRange, location, latitude, longitude, userId, firstName, lastName, userRating){
    return this.httpClient.post(`${this.SERVER_URL}/post-service`,{
      title, description, category, priceRange, location, latitude, longitude, userId, firstName, lastName, userRating
    })
  }
  getUserServices(userId){
    return this.httpClient.get(`${this.SERVER_URL}/users/${userId}/services`)
    .pipe(
      tap( 
        _=> {
          console.log('get user services of id' + userId )}),
      catchError(this.handleError<any>('getUserServices',[]))
    )
  }
  getUserJobs(userId){
    return this.httpClient.get(`${this.SERVER_URL}/users/${userId}/jobs`)
    .pipe(
      tap( 
        _=> {
          console.log('get user jobs of id' + userId )}),
      catchError(this.handleError<any>('getUserJobs',[]))
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

