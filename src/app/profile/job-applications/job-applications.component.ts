import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {
  @Input() userId: string;
  bookings:any[];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchJobApplications();
  }
  fetchJobApplications(){
    this.apiService.getJobApplications(this.userId)
    .subscribe((bookings)=>{
      this.bookings = bookings.data;
    })
  }

}
