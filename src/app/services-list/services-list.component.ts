import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  services: any[]
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchServices();
  }
  fetchServices(){
    this.apiService.getServices()
    .subscribe((services)=>{
      this.services = services.data;
    })
  }

}
