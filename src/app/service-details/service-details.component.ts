import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { User } from '../class/user';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from '../service/socket.service';
import { ToastrService } from 'ngx-toastr';
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
    private modalService: NgbModal,
    private socketService: SocketService,
    private toastr: ToastrService ) { }

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
      this.toastr.success(`Successfully booked ${this.service.title}`);
      this.router.navigate(['../../profile'], { relativeTo: this.route });
      
    })
    this.socketService.notify(this.user.id, this.service.user_id, `${this.user.first_name} ${this.user.last_name} is requesting for your service | ${this.service.title} |`);

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
  messageWorker(){

    //console.log(this.user.id,this.job.user_id,this.user.first_name + " " +this.user.last_name, this.job.first_name + " " + this.job.last_name);
    this.apiService.joinRoom(this.user.id,this.service.user_id,this.user.first_name + " " +this.user.last_name, this.service.first_name + " " + this.service.last_name)
    .subscribe((data)=>{
      this.router.navigate(['../../messages'], { relativeTo: this.route })
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
