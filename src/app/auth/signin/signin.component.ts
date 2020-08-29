import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder, 
    private cookieService: CookieService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.form.controls; }
  onSubmit(){
    this.submitted=true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading=true;
    this.apiService.loginUser(this.form.value.email, this.form.value.password)
    .subscribe((data)=> {
      console.log(data);
      this.cookieService.set( 'Test', JSON.stringify(data)); 
      this.loading=false; 
      this.router.navigate(['../home'], { relativeTo: this.route }); 
    }, (err)=>{
      console.log(err);
      alert(err.error.error.message);
      this.loading=false;
    }
    
    )
    
  }
}
