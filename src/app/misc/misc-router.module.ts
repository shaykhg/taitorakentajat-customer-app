import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AddServiceComponent} from './add-service/add-service.component';
import {PackagesComponent} from './packages/packages.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {RatingComponent} from './rating/rating.component';

const routes: Routes = [
  {
    path: 'add-services',
    component: AddServiceComponent
  },

  {
    path: 'packages',
    component: PackagesComponent
  },

  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'review/:booking/:user',
    component: RatingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscRouterModule {
}
