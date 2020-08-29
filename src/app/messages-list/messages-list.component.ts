import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../class/user';
import { SocketService } from '../service/socket.service';
import { ApiService } from '../service/api.service';
import { Observable,Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  user: User;
  rooms: any[];
  currentRoom: string;
  private _roomSub: Subscription;
  constructor(private cookieService: CookieService,
    private socketService: SocketService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getChatLists();
    
  }
  getChatLists(){
    //console.log("getChatlist")
    var userObj = JSON.parse(this.cookieService.get('Test'));
    this.apiService.getChatList(userObj.id)
    .subscribe((rooms)=>{
      console.log(rooms);
      this.rooms= rooms.data;
    });
  }
  ngOnDestroy():void{
    if(this._roomSub){
      this._roomSub.unsubscribe();
    } 
    
  }
  loadRoom(roomId){
    this.socketService.getRoom(roomId);

    //this.apiService.getMessages(roomId);
    //this.router.navigate(['/messages'], { queryParams: { roomId: roomId } });
  }
}
