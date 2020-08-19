import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../class/user';
import { CookieService } from 'ngx-cookie-service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User
  active = 1;
  constructor(private apiService: ApiService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.fetchUser();
  }
  fetchUser(){
    var userObj = JSON.parse(this.cookieService.get('Test'));
    console.log(userObj);
    this.user = userObj;
    /* this.apiService.getUser(userObj.id)
    .subscribe((user)=>{console.log(user); this.user = user.data}) */
  }

}
