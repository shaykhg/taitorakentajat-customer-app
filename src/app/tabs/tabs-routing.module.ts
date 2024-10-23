import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {AuthGuard} from '../services/auth-guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // {
      //   path: 'home',
      //   loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      // },
      {
        path: 'tab1',
        // loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)

      },
      {
        path: 'tab2',
        // loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)

      },
      {
        canActivate: [AuthGuard],
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'manage-users',
        loadChildren: () => import('../manage-users/manage-users.module').then(m => m.ManageUsersPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
