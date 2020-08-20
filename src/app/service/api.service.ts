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
  filterJobs(distance, title, categoryId, subcategoryId, latitude, longitude, sortBy, pageNum){
    var queryString="";
    if (pageNum){
      queryString+=`pageNum=${pageNum}`
    }else{
      queryString+=`pageNum=1`
    }
    queryString+=`&title=${title}&categoryId=${categoryId}&subcategoryId=${subcategoryId}&sortBy=${sortBy}&latitude=${latitude}&longitude=${longitude}&distance=${distance*1000}`
    return this.httpClient.get(`${this.SERVER_URL}/jobs?${queryString}`)
    .pipe(
      tap(_=> console.log('get jobs')),
      catchError(this.handleError<any>('getJobs',[]))
    )
  }
  filterServices(distance, title, categoryId, subcategoryId, latitude, longitude, sortBy, pageNum){
    var queryString="";
    if (pageNum){
      queryString+=`pageNum=${pageNum}`
    }else{
      queryString+=`pageNum=1`
    }
    queryString+=`&title=${title}&categoryId=${categoryId}&subcategoryId=${subcategoryId}&sortBy=${sortBy}&latitude=${latitude}&longitude=${longitude}&distance=${distance*1000}`
    return this.httpClient.get(`${this.SERVER_URL}/services?${queryString}`)
    .pipe(
      tap(_=> console.log('get jobs')),
      catchError(this.handleError<any>('getJobs',[]))
    )
  }
  getCategories(){
    return this.httpClient.get(`${this.SERVER_URL}/categories`)
    .pipe(
      tap(_=> console.log('get categories')),
      catchError(this.handleError<any>('getCategories',[]))
    )
  }
  getSubcategories(categoryId:string){
    return this.httpClient.get(`${this.SERVER_URL}/categories/${categoryId}/subcategories`)
    .pipe(
      tap(_=> console.log('get subcategories of id: ' + categoryId)),
      catchError(this.handleError<any>('getSubcategories',[]))
    )
  }
  getServices(){
    return this.httpClient.get(`${this.SERVER_URL}/services`)
    .pipe(
      tap(_=> console.log('get services')),
      catchError(this.handleError<any>('getServices',[]))
    )
  }
  getJob(jobId){
    return this.httpClient.get(`${this.SERVER_URL}/jobs/${jobId}`)
    .pipe(
      tap(_=> console.log('get job with id:' + jobId)),
      catchError(this.handleError<any>('getJob',[]))
    )
  }
  getService(serviceId){
    return this.httpClient.get(`${this.SERVER_URL}/services/${serviceId}`)
    .pipe(
      tap(_=> console.log('get job with id:' + serviceId)),
      catchError(this.handleError<any>('getService',[]))
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
  postJob(title,description, categoryId,categoryName, subcategoryId, subcategoryName, location, latitude, longitude, userId, firstName, lastName, userRating){
    return this.httpClient.post(`${this.SERVER_URL}/post-job`,{
      title: title,
      description: description,
      categoryId: categoryId,
      categoryName: categoryName,
      subcategoryId: subcategoryId,
      subcategoryName: subcategoryName,
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
  postService(title, description, categoryId,categoryName,subcategoryId,subcategoryName, priceRange, location, latitude, longitude, userId, firstName, lastName, userRating){
    return this.httpClient.post(`${this.SERVER_URL}/post-service`,{
      title, description, categoryId,categoryName,subcategoryId,subcategoryName, priceRange, location, latitude, longitude, userId, firstName, lastName, userRating
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
  getJobApplications(userId){
    return this.httpClient.get(`${this.SERVER_URL}/users/${userId}/job-applications`)
    .pipe(
      tap( 
        _=> {
          console.log('get job applications of user id' + userId )}),
      catchError(this.handleError<any>('getJobApplications',[]))
    )
  }
  getServiceRequests(userId){
    return this.httpClient.get(`${this.SERVER_URL}/users/${userId}/service-requests`)
    .pipe(
      tap( 
        _=> {
          console.log('get job applications of user id' + userId )}),
      catchError(this.handleError<any>('getUserJobs',[]))
    )
  }
  getJobBookings(jobId){
    return this.httpClient.get(`${this.SERVER_URL}/jobs/${jobId}/bookings`)
    .pipe(
      tap( 
        _=> {
          console.log('get bookings of jobid ' + jobId )}),
      catchError(this.handleError<any>('getJobBookings',[]))
    )
  }

  getServiceBookings(serviceId){
    return this.httpClient.get(`${this.SERVER_URL}/services/${serviceId}/bookings`)
    .pipe(
      tap( 
        _=> {
          console.log('get bookings of serviceId ' + serviceId )}),
      catchError(this.handleError<any>('getServiceBookings',[]))
    )
  }

  postBooking(clientId, workerId, serviceId, jobId, price){
    return this.httpClient.post(`${this.SERVER_URL}/post-booking`,{
      clientId, workerId, serviceId, jobId, price
    })
    .pipe(
      tap( 
        _=> {
          console.log('post booking' )}),
      catchError(this.handleError<any>('postBooking',[]))
    )
  }
  putBookingStatus(bookingId, status){
    return this.httpClient.put(`${this.SERVER_URL}/update-booking-status`,{
      bookingId, status
    })
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

