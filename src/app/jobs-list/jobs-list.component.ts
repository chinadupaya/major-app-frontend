import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';  
import { FormGroup, FormBuilder } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  form: FormGroup;
  markers=[];
  center;
  address;
  latitude;
  longitude;
  distance:number;
  jobs: any[]
  page = 1;
  categories: any[];
  subcategories: any[];
  constructor(private apiService:ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getJobs();
    this.getCategories();
    this.getSubcategories('');
    this.form = this.formBuilder.group({
      address:'',
      title: '',
      category:'',
      subcategory:'',
      sortBy: 'date_ascending',
      distance: 25
    })
    this.distance = 25;
  }
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  public handleAddressChange(address) {
    this.address=address.formatted_address;
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
  }
  getJobs(){
    this.apiService.getJobs()
    .subscribe((jobs)=>{
      this.jobs=jobs.data;
      //console.log("first job", this.jobs[0]);
      this.center={
        lat: this.jobs[0].position.y,
        lng: this.jobs[0].position.x
      }
      this.assignMarkers(jobs.data);
    })
  }
  getCategories(){
    this.apiService.getCategories()
    .subscribe((categories)=>{
      this.categories=categories.data;
    })
  }
  getSubcategories(categoryId){
    this.apiService.getSubcategories(categoryId)
    .subscribe((subcategories)=>{
      this.subcategories = subcategories.data;
    })
  }
  onChangeCategory(event:Event){
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    //this.currentCategory = selectedOptions[selectedIndex].text;
    //console.log(value, text);
    this.getSubcategories(selectedOptions[selectedIndex].value);
    this.form.value.subcategory='';
  }
  onChangeSubcategory(event:Event){
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    //console.log(selectedOptions[selectedIndex]);
    //this.currentSubcategory = selectedOptions[selectedIndex].text;
  }
  onSubmit(){
    var formVal = this.form.value;
    console.log(this.form.value,this.address,this.latitude, this.longitude);
    this.apiService.filterJobs(this.distance,formVal.title,formVal.category, formVal.subcategory,
      this.latitude,this.longitude,formVal.sortBy, 1)
      .subscribe((jobs)=>{
        this.jobs = jobs.data;
        this.center={
          lat: this.jobs[0].position.y,
          lng: this.jobs[0].position.x
        }
        this.assignMarkers(jobs.data);
      });
  }

  nextPage(){
    var formVal = this.form.value;
    this.page+=1
    this.apiService.filterJobs(this.distance,formVal.title,formVal.category, formVal.subcategory,
      this.latitude,this.longitude,formVal.sortBy, this.page)
      .subscribe((jobs)=>{
        this.jobs = jobs.data;
        this.center={
          lat: this.jobs[0].position.y,
          lng: this.jobs[0].position.x
        }
        this.assignMarkers(jobs.data);
      });

    
  }
  prevPage(){
    var formVal = this.form.value;
    this.page-=1
    this.apiService.filterJobs(this.distance,formVal.title,formVal.category, formVal.subcategory,
      this.latitude,this.longitude,formVal.sortBy, this.page)
      .subscribe((jobs)=>{
        this.jobs = jobs.data;
        this.center={
          lat: this.jobs[0].position.y,
          lng: this.jobs[0].position.x
        }
        this.assignMarkers(jobs.data);
      }); 
  }
  changeDistance(val){
    //console.log(val);
    this.distance= val;
  }
  clearFilters(){
    this.getJobs();
    this.address="";
    this.latitude=0;
    this.longitude=0;
    this.distance = 25;
    this.form = this.formBuilder.group({
      address:'',
      title: '',
      category:'',
      subcategory:'',
      sortBy: 'date_ascending',
      distance: 25
    })
  }
  assignMarkers(values){
    //console.log("is this running");
    this.markers=[];
    let i;
    for (i=0; i<values.length;i++){
      //console.log(values[i])
      this.markers.push({
        position: {
          lat: values[i].position.y,
          lng: values[i].position.x,
        },
        label: {
          color: 'red',
        },
        title: values[i].title,
      })
    }
    console.log(this.markers);
  }
}
