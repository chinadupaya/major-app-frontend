import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';  
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  jobs: any[]
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getJobs();
  }
  getJobs(){
    this.apiService.getJobs()
    .subscribe((jobs)=>{
      this.jobs=jobs.data;
    })
  }

}
