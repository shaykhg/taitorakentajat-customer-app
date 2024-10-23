import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'misc',
    loadChildren: () => import('./misc/misc.module').then(m => m.MiscModule)
  },

  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'term-and-condition',
    loadChildren: () => import('./term-and-condition/term-and-condition.module').then( m => m.TermAndConditionPageModule)
  },
  {
    path: 'cancellation-policy',
    loadChildren: () => import('./cancellation-policy/cancellation-policy.module').then( m => m.CancellationPolicyPageModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then( m => m.CompanyPageModule)
  },
  {
    path: 'booking-details/:id',
    loadChildren: () => import('./booking-details/booking-details.module').then( m => m.BookingDetailsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
