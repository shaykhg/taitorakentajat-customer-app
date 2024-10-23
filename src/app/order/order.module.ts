import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlaceOrderComponent} from './place-order/place-order.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CustomerOrderComponent} from './place-order/customer-order/customer-order.component';
import {OrderRoutingModule} from './order-routing.module';
import {BookingStatusComponent} from './booking-status/booking-status.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [PlaceOrderComponent, CustomerOrderComponent, BookingStatusComponent,     MyOrdersComponent
  ],
  exports: [
    PlaceOrderComponent,
    CustomerOrderComponent,
    BookingStatusComponent,
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatButtonModule,
    OrderRoutingModule,
    IonicModule
  ]
})
export class OrderModule { }
