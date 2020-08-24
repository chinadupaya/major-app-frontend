import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './auth/register/register.component';
import { SigninComponent } from './auth/signin/signin.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from './profile/profile.component';
import { CreateWorkerProfileComponent } from './create-worker-profile/create-worker-profile.component';
import { PostJobComponent } from './post-job/post-job.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { PostServiceComponent } from './post-service/post-service.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { UserJobsComponent } from './user-jobs/user-jobs.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { JobApplicationsComponent } from './profile/job-applications/job-applications.component';
import { ServiceRequestsComponent } from './profile/service-requests/service-requests.component';
import { PostReviewComponent } from './post-review/post-review.component';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';
import { TestComponentComponent } from './test-component/test-component.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SigninComponent,
    NavComponent,
    LandingComponent,
    ProfileComponent,
    CreateWorkerProfileComponent,
    PostJobComponent,
    JobsListComponent,
    PostServiceComponent,
    ServicesListComponent,
    UserJobsComponent,
    UserServicesComponent,
    JobDetailsComponent,
    ServiceDetailsComponent,
    JobApplicationsComponent,
    ServiceRequestsComponent,
    PostReviewComponent,
    UserReviewsComponent,
    TestComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
