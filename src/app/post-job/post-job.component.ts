import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  categories: any[];
  subcategories: any[];
  currentCategory:string;
  currentSubcategory: string;
  address;
  latitude;
  longitude;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSubcategories('a');
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      category: ['a', Validators.required],
      subcategory: ['a', Validators.required],
    });
  }
  getCategories(){
    this.apiService.getCategories()
    .subscribe((categories)=>{
      this.categories = categories.data;
      this.currentCategory=categories.data[0].name;
    })
  }
  getSubcategories(categoryId){
    this.apiService.getSubcategories(categoryId)
    .subscribe((subcategories)=>{
      this.subcategories = subcategories.data;
      this.currentSubcategory = subcategories.data[0].name;
    })
  }
  get f() { return this.form.controls; }
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
      public handleAddressChange(address) {
        this.address=address.formatted_address;
        this.latitude = address.geometry.location.lat();
        this.longitude = address.geometry.location.lng();
  }
  onSubmit(){
    //console.log(this.form.value, this.address,this.latitude, this.longitude);
    var userObj = JSON.parse(this.cookieService.get('Test'));
    /* console.log(this.form.value.title, this.form.value.description,this.form.value.category,
      this.currentCategory, this.form.value.subcategory, this.currentSubcategory,
      this.address, this.latitude, this.longitude, userObj.id, userObj.first_name, userObj.last_name, userObj.rating); */
    this.apiService.postJob(this.form.value.title, this.form.value.description,this.form.value.category,
      this.currentCategory, this.form.value.subcategory, this.currentSubcategory,
      this.address, this.latitude, this.longitude, userObj.id, userObj.first_name, userObj.last_name, userObj.rating)
    .subscribe((res)=>{
      console.log(res);
      this.router.navigate(['../profile'], { relativeTo: this.route })
    })
  }
  onChangeCategory(event:Event){
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    this.currentCategory = selectedOptions[selectedIndex].text;
    //console.log(value, text);
    this.getSubcategories(selectedOptions[selectedIndex].value);
  }
  onChangeSubcategory(event:Event){
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    //console.log(selectedOptions[selectedIndex]);
    this.currentSubcategory = selectedOptions[selectedIndex].text;
  }
  getText(event:Event){
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    let selectElementText = selectedOptions[selectedIndex].text;
    console.log(selectElementText,selectedOptions[selectedIndex].value)
  }

}
