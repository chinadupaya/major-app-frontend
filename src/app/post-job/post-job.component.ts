import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  address;
  latitude;
  longitude;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      category: ['test1', Validators.required]
    });
  }
  get f() { return this.form.controls; }
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
      public handleAddressChange(address) {
        this.address=address.formatted_address;
        this.latitude = address.geometry.location.lat();
        this.longitude = address.geometry.location.lng();
  }
  onSubmit(){
    //console.log(this.form.value, this.address,this.latitude, this.longitude);
    var userObj = JSON.parse(this.cookieService.get('Test'));
    this.apiService.postJob(this.form.value.title, this.form.value.description,this.form.value.category,
      this.address, this.latitude, this.longitude, userObj.id, userObj.first_name, userObj.last_name, userObj.rating)
    .subscribe((res)=>{
      console.log(res);
      this.router.navigate(['../profile'], { relativeTo: this.route })
    })
  }

}
