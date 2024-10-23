import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyPage } from './company.page';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {CompanySignUpComponent} from './company-sign-up/company-sign-up.component';
import {AuthGuard} from '../services/auth-guard';
const routes: Routes = [
  {
    path: '',
    component: CompanyPage
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    canActivate : [AuthGuard],
    path: 'company-signup',
    component: CompanySignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyPageRoutingModule {}
