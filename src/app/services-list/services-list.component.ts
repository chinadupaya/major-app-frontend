import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  services: any[]
  form: FormGroup
  page = 1;
  address;
  latitude;
  longitude;
  categories: any[];
  distance:number;
  subcategories: any[];
  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchServices();
    this.getCategories();
    this.getSubcategories('');
    this.form = this.formBuilder.group({
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
  fetchServices(){
    this.apiService.getServices()
    .subscribe((services)=>{
      this.services = services.data;
    })
    
  }
  onSubmit(){
    var formVal = this.form.value;
    console.log(this.form.value);
    this.apiService.filterServices(this.distance,formVal.title,formVal.category, formVal.subcategory,
      this.latitude,this.longitude,formVal.sortBy, 1)
      .subscribe((services)=>{
        console.log(services);
        this.services = services.data;
      });
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
  nextPage(){
    var formVal = this.form.value;
    this.page+=1
    this.apiService.filterServices(this.distance,formVal.title,formVal.category, formVal.subcategory,
      this.latitude,this.longitude,formVal.sortBy, this.page)
      .subscribe((services)=>{
        this.services = services.data;
      });
    
  }
  prevPage(){
    var formVal = this.form.value;
    this.page-=1
    this.apiService.filterServices(this.distance,formVal.title,formVal.category, formVal.subcategory,
      this.latitude,this.longitude,formVal.sortBy, this.page)
      .subscribe((services)=>{
        this.services = services.data;
      });
    
  }
  changeDistance(val){
    //console.log(val);
    this.distance= val;
  }

}
