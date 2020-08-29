import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../class/user';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id:string;
  user: User;
  userProfile: User;
  constructor(private router:Router, private route:ActivatedRoute,
    private cookieService: CookieService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.user = JSON.parse(this.cookieService.get('Test'));
    this.getUserProfile();
  }
  
  getUserProfile(){
    this.apiService.getUser(this.id)
    .subscribe((user)=>{
      this.userProfile = user.data;
    })
  }
  messageWorker(){

    //console.log(this.user.id,this.job.user_id,this.user.first_name + " " +this.user.last_name, this.job.first_name + " " + this.job.last_name);
    this.apiService.joinRoom(this.user.id,this.userProfile.id,this.user.first_name + " " +this.user.last_name, this.userProfile.first_name + " " + this.userProfile.last_name)
    .subscribe((data)=>{
      this.router.navigate(['../../messages'], { relativeTo: this.route })
    });
    
  }
}
