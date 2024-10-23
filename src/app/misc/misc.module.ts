import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddServiceComponent} from './add-service/add-service.component';
import {PackagesComponent} from './packages/packages.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {CustomServicesComponent} from './add-service/custom-services/custom-services.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ProductComponent} from './product/product.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MiscRouterModule} from './misc-router.module';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {IonicModule} from '@ionic/angular';
import {RatingComponent} from './rating/rating.component';
import {BarRatingModule} from 'ngx-bar-rating';
import {FloorRepairComponent} from './floor-repair/floor-repair.component';
import {TaitoServicesModule} from '../taito-services/taito-services.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';



@NgModule({
    declarations: [
        AddServiceComponent,
        PackagesComponent,
        ScheduleComponent,
        CustomServicesComponent,
        ProductComponent,
        RatingComponent,
        FloorRepairComponent
    ],
  exports: [
    AddServiceComponent,
    PackagesComponent,
    ScheduleComponent,
    CustomServicesComponent,
    ProductComponent
  ],
    imports: [
        CommonModule,
        MatSelectModule,
        MatCardModule,
        MatTooltipModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatTabsModule,
        MatSlideToggleModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MiscRouterModule,
        CdkStepperModule,
        IonicModule,
        BarRatingModule,
        TaitoServicesModule,
        NgxMaterialTimepickerModule,

    ]
})
export class MiscModule { }
