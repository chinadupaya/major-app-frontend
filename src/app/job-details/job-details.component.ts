import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  job;
  constructor(private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.fetchJob()
  }

  fetchJob(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log("job id",id)
    this.apiService.getJob(id)
    .subscribe((job)=>{
      this.job = job.data;
    })
  }
}
