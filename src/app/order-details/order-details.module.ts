import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailsPageRoutingModule } from './order-details-routing.module';

import { OrderDetailsPage } from './order-details.page';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailsPageRoutingModule,
    MatCardModule,
    MatTabsModule
  ],
  declarations: [OrderDetailsPage]
})
export class OrderDetailsPageModule implements OnInit{
  ngOnInit(): void {

  }
}
