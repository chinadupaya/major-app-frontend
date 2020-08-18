import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.css']
})
export class UserJobsComponent implements OnInit {
  @Input() userId: string;
  jobs: any[]
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchUserJobs();
  }

  fetchUserJobs(){
    this.apiService.getUserJobs(this.userId)
    .subscribe((jobs)=>{
      this.jobs = jobs.data;
    })
  }

}
