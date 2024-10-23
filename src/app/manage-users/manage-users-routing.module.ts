import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageUsersPage } from './manage-users.page';
import {AddUserComponent} from './add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: ManageUsersPage
  },
  {
    path: 'add-user',
    component: AddUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageUsersPageRoutingModule {}
