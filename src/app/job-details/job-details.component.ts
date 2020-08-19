import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'; 
import { User } from '../class/user';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  job;
  user: User;
  form: FormGroup;
  bookings: any[];
  constructor(private apiService: ApiService, 
    private cookieService: CookieService,
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchJob()
    this.user = JSON.parse(this.cookieService.get('Test'))
    this.form = this.formBuilder.group(
      {
        price: [1, Validators.required]
      }
    )
  }

  fetchJobBookings(jobId){
    this.apiService.getJobBookings(jobId)
    .subscribe(bookings=>{
      this.bookings = bookings.data
    })
  }
  fetchJob(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log("job id",id)
    this.apiService.getJob(id)
    .subscribe((job)=>{
      this.job = job.data;
      this.fetchJobBookings(job.data.id);
    })
  }

  onSubmit(){

    var userObj = JSON.parse(this.cookieService.get('Test'))
    this.apiService.postBooking(this.job.user_id, userObj.id,"",this.job.id, this.form.value.price)
    .subscribe((res)=>{
      console.log(res);
    });
    this.bookings.push({
      client_id:this.job.user_id, worker_id:userObj.id,service_id:"",job_id:this.job.id, price:this.form.value.price, status:0
    })
  }

}
