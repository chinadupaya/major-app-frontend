import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.css']
})
export class PostReviewComponent implements OnInit {
  currentRate = 5;
  form: FormGroup;
  user;
  closeResult = '';
  @Input() booking;
  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.user=JSON.parse(this.cookieService.get('Test'));
    this.form = this.formBuilder.group({
      ratingNum: [5, Validators.required],
      content: ["", Validators.required],
    });
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
  onSubmit(){
    //console.log(this.form.value);
    this.apiService.postReview(this.user.id,this.user.first_name, 
      this.user.last_name, this.form.value.ratingNum,this.form.value.content, this.booking.worker_id)
      .subscribe((response)=>{
        console.log(response);
      })
  }


}
