import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, tap, first } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable({
  providedIn: 'root'
})

export class SocketService {
  currentRoom = this.socket.fromEvent<any>('room');
  rooms = this.socket.fromEvent<any[]>('rooms');
  //messages = this.socket.fromEvent<any[]>('messages');
  messages: Subscription;
  constructor(private socket: Socket,
    private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  //socket:any;
  
  listen(eventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data)=>{
        //console.log("listen",eventName, data)
        subscriber.next(data);
      })
    })
  };
  emit(eventName:string, data){
    this.socket.emit(eventName,data);
  };
  
  sendMessage(data){
    console.log(data);
    this.socket.emit('message',data);
  };
  getRoom(roomId){
    this.socket.emit('getRoom',roomId);
    this.currentRoom=roomId;
    /* this.getMessages(roomId)
    .subscribe((messages)=>{
      console.log(messages);
      this.messages = messages.data;
    }) */
  }
  newMessageReceived() {
    const observable = new Observable<any>(observer => {
      this.socket.on('newMessage', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data) {
    //console.log("typing rn");
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        console.log("receiving typing");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  receivedNotification() {
    const observable = new Observable<any>(observer => {
      this.socket.on('newNotification', (data) => {
        console.log("receiving notification");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  notify(sender, receiver, message){
    var data = {
      sender: sender,
      receiver: receiver,
      message: message
    }
    this.socket.emit('notification',data);
  }
/*   getChatList(userId){
    //console.log("getChatList", userId);
    //this.socket.emit('chatrooms', userId);
    return this.httpClient.get(`${this.SERVER_URL}/users/${userId}/rooms`)
    .pipe(
      tap(_=> console.log('get User id ' + userId)),
      catchError(this.handleError<any>('getUser',[]))
    )
  } */

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
