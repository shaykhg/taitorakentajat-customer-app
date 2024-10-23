import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingDetailsPage } from './booking-details.page';

const routes: Routes = [
  {
    path: '',
    component: BookingDetailsPage
  },  {
    path: 'complete-booking',
    loadChildren: () => import('./complete-booking/complete-booking.module').then( m => m.CompleteBookingPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingDetailsPageRoutingModule {}
