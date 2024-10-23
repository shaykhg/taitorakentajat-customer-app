import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlaceOrderComponent} from './place-order/place-order.component';
import {BookingStatusComponent} from './booking-status/booking-status.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';


const routes: Routes = [
  {
    path: 'place-order',
    component: PlaceOrderComponent
  },
  {
    path: 'booking-status',
    component: BookingStatusComponent
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
