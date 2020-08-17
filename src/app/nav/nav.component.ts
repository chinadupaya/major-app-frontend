import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.checkUser();
  }
  checkUser(){
    if(this.cookieService.check('Test')){
      return true;
    }else{
      return false;
    }
  }
  logoutUser(){
    this.cookieService.delete('Test');
    this.router.navigate(['../signin'], { relativeTo: this.route })
  }

}
