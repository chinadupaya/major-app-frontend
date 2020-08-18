import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  service;
  constructor(private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.fetchService();
  }
  fetchService(){
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getService(id)
    .subscribe((service)=>{
      this.service = service.data;
    })
  }

}
