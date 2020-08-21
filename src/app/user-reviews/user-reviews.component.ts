import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {
  reviews: any[];
  @Input() userId: string;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getReviews();
  }
  getReviews(){
    this.apiService.getUserReviews(this.userId)
    .subscribe((reviews)=>{
      console.log(reviews);
      this.reviews=  reviews.data;
    })
  }

}
