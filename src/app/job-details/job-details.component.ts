import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  closeResult = '';
  job;
  user: User;
  form: FormGroup;
  bookings: any[];
  constructor(private apiService: ApiService, 
    private cookieService: CookieService,
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

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
      console.log(job);
      this.job = job.data;
      this.fetchJobBookings(job.data.id);
    })
  }

  onSubmit(){

    console.log(this.user);
    this.apiService.postBooking(this.job.user_id, this.user.id,"",this.job.id, this.form.value.price)
    .subscribe((res)=>{
      console.log(res);
      this.router.navigate(['../../jobs'], { relativeTo: this.route });
    });
    this.bookings.push({
      client_id:this.job.user_id, worker_id:this.user.id,service_id:"",job_id:this.job.id, price:this.form.value.price, status:0
    })
  }
  updateBooking(id, status){
    this.apiService.putBookingStatus(id,+status)
    .subscribe((res)=>{
      console.log(res);
      this.fetchJobBookings(this.job.id);
    })
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
