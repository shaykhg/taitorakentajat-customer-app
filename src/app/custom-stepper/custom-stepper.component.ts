import {ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';
import {DataShareService} from '../services/data-share.service';
import {Directionality} from '@angular/cdk/bidi';

@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: CustomStepperComponent }]
})
export class CustomStepperComponent  extends CdkStepper {

  constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef, public data: DataShareService) {
    super(dir, changeDetectorRef);
  }

  onClick(index: number): void {
    this.selectedIndex = index;
  }

}
