import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancellationPolicyPage } from './cancellation-policy.page';

const routes: Routes = [
  {
    path: '',
    component: CancellationPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancellationPolicyPageRoutingModule {}
