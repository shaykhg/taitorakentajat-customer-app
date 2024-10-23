import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import {AddUserDetailsComponent} from './add-user-details/add-user-details.component';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'add-user-detail',
    component: AddUserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
