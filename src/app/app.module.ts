import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OrderModule} from './order/order.module';
import {MiscModule} from './misc/misc.module';
import {AuthModule} from './auth/auth.module';

import {HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ClipboardModule} from 'ngx-clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxIonicImageViewerModule} from 'ngx-ionic-image-viewer';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    OrderModule,
    MiscModule,
    AuthModule,
    ClipboardModule,
    HttpClientModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSnackBarModule,
    NgxIonicImageViewerModule,

  ],

  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule {}
