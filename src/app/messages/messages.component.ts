import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../class/user';
import { Subscription } from 'rxjs';
import { SocketService } from '../service/socket.service';
import { ApiService } from '../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  user: User;
  message: string;
  messages: any[];
  isTyping = false;
  roomId = "Select a chat...";
  _currentRoomSub: Subscription;
  _messageSub: Subscription;
  constructor(
    private cookieService: CookieService, 
    private socketService:SocketService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute) {
      this.socketService.newMessageReceived().subscribe(data => {
        console.log("new message",data);
        this.messages.push(data);
        this.isTyping = false;
        console.log(this.messages);
      });
      this.socketService.receivedTyping().subscribe(bool => {
        this.isTyping = bool.isTyping;
      });
     }

  ngOnInit(): void {
    this._currentRoomSub = this.socketService.currentRoom.subscribe((roomId)=>{
      console.log("current room sub", roomId);
      this.roomId = roomId;
      this.apiService.getMessages(this.roomId)
      .subscribe((messages)=>{
        this.messages = messages.data;
      });
    }); 
    this.user = JSON.parse(this.cookieService.get('Test'));
/* 
    this.apiService.getMessages(this.roomId)
    .subscribe((messages)=>{
      this.messages = messages.data;
    }); */
    console.log("messages ", this.socketService.messages);
  }
  sendMessage(){
    console.log(this.message);
    var data={
      room_id: this.roomId,
      message:{
        content: this.message,
        sent_by: this.user.id
      },
    }
    //this.socketService.sendMessage(data);
    this.apiService.postMessage(this.roomId,this.message, this.user.id)
    .subscribe((res)=>{
      console.log(res)
    });
    /* this.webSocketService.listen('new-message').subscribe((data)=>{
      console.log(data);
      
    });  */
    //this.messages.push(this.message);
    this.message = '';
  }
  typing() {
    console.log("is typing");
    this.socketService.typing({room_id: this.roomId});
  }
  ngOnDestroy(){
    if(this._currentRoomSub){
      this._currentRoomSub.unsubscribe();
    } 
    if(this._messageSub){
      this._messageSub.unsubscribe();
    } 
    
  }

}
