import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { SigninComponent } from './auth/signin/signin.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateWorkerProfileComponent } from './create-worker-profile/create-worker-profile.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: LandingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-worker-profile', component: CreateWorkerProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
