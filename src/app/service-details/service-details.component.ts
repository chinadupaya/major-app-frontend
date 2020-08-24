import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { User } from '../class/user';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  service;
  closeResult='';
  user: User;
  bookings: any[];
  constructor(private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router: Router,
    private cookieService: CookieService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchService();
    this.user = JSON.parse(this.cookieService.get('Test'));
  }
  fetchService(){
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getService(id)
    .subscribe((service)=>{
      this.service = service.data;
      this.fetchServiceBookings(service.data.id)
      
    })
  }
  fetchServiceBookings(serviceId){
    this.apiService.getServiceBookings(serviceId)
    .subscribe((bookings)=>{
      console.log(bookings);
      this.bookings = bookings.data;
    })

  }
  bookService(){
    this.apiService.postBooking(this.user.id, this.service.user_id, this.service.id, "", this.service.price_range)
    .subscribe((res)=>{
      console.log(res);
      this.router.navigate(['../../services'], { relativeTo: this.route });
    })
  }
  updateBooking(id, status){
    this.apiService.putBookingStatus(id,+status)
    .subscribe((res)=>{
      console.log(res);
      
    this.fetchServiceBookings(this.service.id);
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
