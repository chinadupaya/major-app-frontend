import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.css']
})
export class ServiceRequestsComponent implements OnInit {
  @Input() userId: string;
  bookings:any[];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchServiceRequests()
  }
  fetchServiceRequests(){
    this.apiService.getServiceRequests(this.userId)
    .subscribe((bookings)=>{
      this.bookings = bookings.data;
    })
  }

}
