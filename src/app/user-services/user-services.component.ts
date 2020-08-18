import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.css']
})
export class UserServicesComponent implements OnInit {
  @Input() userId: string;
  services: any[];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchUserServices();
  }

  fetchUserServices(){
    this.apiService.getUserServices(this.userId)
    .subscribe((services)=>{
      console.log(services.data);
      this.services = services.data;
    });
  }

}
