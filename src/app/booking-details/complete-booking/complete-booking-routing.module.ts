import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteBookingPage } from './complete-booking.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteBookingPageRoutingModule {}
