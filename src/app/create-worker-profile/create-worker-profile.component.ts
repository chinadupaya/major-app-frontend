import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-worker-profile',
  templateUrl: './create-worker-profile.component.html',
  styleUrls: ['./create-worker-profile.component.css']
})
export class CreateWorkerProfileComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  govIdInputLabel: string;
  nbiClearanceInputLabel: string;
  signatureInputLabel: string;
  fileUploadForm: FormGroup;
  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      nbiClearance: [''],
      govId: [''],
      signature: ['']
    });
  }
  onGovIdSelect(event) {
    const file = event.target.files[0];
    this.govIdInputLabel = file.name;
    this.fileUploadForm.get('govId').setValue(file);
  }
  onNbiClearanceSelect(event) {
    const file = event.target.files[0];
    this.nbiClearanceInputLabel = file.name;
    this.fileUploadForm.get('nbiClearance').setValue(file);
  }
  onSignatureSelect(event) {
    const file = event.target.files[0];
    this.signatureInputLabel = file.name;
    this.fileUploadForm.get('signature').setValue(file);
  }
  onFormSubmit() {
    var userObj = JSON.parse(this.cookieService.get('Test'))
    if (!this.fileUploadForm.get('govId').value && !this.fileUploadForm.get('signature').value && !this.fileUploadForm.get('nbiClearance').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('govId', this.fileUploadForm.get('govId').value)
    formData.append('signature', this.fileUploadForm.get('signature').value)
    formData.append('nbiClearance', this.fileUploadForm.get('nbiClearance').value)
    formData.append('userId',`${userObj.id}`);
    //formData.append('agentId', '007');
    //console.log(this.fileUploadForm);


    this.http.post<any>(`http://localhost:3000/create-worker-profile`, formData).subscribe(response => {
        console.log(response);
        if (response.data) {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.nbiClearanceInputLabel = undefined;
          this.govIdInputLabel = undefined;
          this.signatureInputLabel = undefined;
          this.cookieService.delete('Test');
          var newUserObj = {
            id: userObj.id,
            first_name: userObj.first_name,
            last_name: userObj.last_name,
            rating: userObj.rating,
            is_worker: 1
          }
          this.cookieService.set('Test', JSON.stringify(newUserObj));
          console.log("updated cookie",this.cookieService.get('Test'))
          this.router.navigate(['../profile'], { relativeTo: this.route })

        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
  }

}
