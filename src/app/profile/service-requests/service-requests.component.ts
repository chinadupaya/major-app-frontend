import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.css']
})
export class ServiceRequestsComponent implements OnInit {
  @Input() userId: string;
  bookings:any[];
  closeResult='';
  constructor(private apiService: ApiService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchServiceRequests()
  }
  fetchServiceRequests(){
    console.log("fetch service running");
    this.apiService.getServiceRequests(this.userId)
    .subscribe((bookings)=>{
      console.log("service requests", bookings);
      this.bookings = bookings.data;
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
