import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancellationPolicyPageRoutingModule } from './cancellation-policy-routing.module';

import { CancellationPolicyPage } from './cancellation-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancellationPolicyPageRoutingModule
  ],
  declarations: [CancellationPolicyPage]
})
export class CancellationPolicyPageModule {}
