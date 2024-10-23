import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';

import {Tab1PageRoutingModule} from './tab1-routing.module';
import {MiscModule} from '../misc/misc.module';
import {OrderModule} from '../order/order.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {StepperComponent} from '../stepper/stepper.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        MiscModule,
        OrderModule,
        MatProgressBarModule,
        MatCardModule,

    ],
  exports: [
    StepperComponent
  ],
  declarations: [Tab1Page, StepperComponent]
})
export class Tab1PageModule {
}
