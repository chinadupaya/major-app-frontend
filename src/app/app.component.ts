import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from './service/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    private cookieService: CookieService,
    private toastr: ToastrService) {
      this.socketService.receivedNotification().subscribe(data => {
        //console.log("receivedNotification", data);
        //this.isTyping = bool.isTyping;
        this.toastr.success(data.message);
      });
    }
  title = 'frontend';
  routerObject = this.router;
  ngOnInit(){
    this.socketService.listen('test').subscribe((data)=>{
      console.log(data);
    });
    if(this.cookieService.check('Test')){
      var userObj = JSON.parse(this.cookieService.get('Test'));
      this.socketService.emit('setSocketId', userObj.id);
      this.toastr.success("Youre connected!","Let's get started!");
    }
    
  }
}
