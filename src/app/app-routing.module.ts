import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { SigninComponent } from './auth/signin/signin.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateWorkerProfileComponent } from './create-worker-profile/create-worker-profile.component';
import { PostJobComponent } from './post-job/post-job.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { PostServiceComponent } from './post-service/post-service.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: LandingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-worker-profile', component: CreateWorkerProfileComponent },
  { path: 'post-job', component: PostJobComponent},
  { path: 'jobs', component: JobsListComponent},
  { path: 'services', component: ServicesListComponent},
  { path: 'post-service', component: PostServiceComponent},
  { path: 'jobs/:id', component: JobDetailsComponent},
  { path: 'services/:id', component: ServiceDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
