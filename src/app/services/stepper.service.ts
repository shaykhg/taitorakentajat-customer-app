import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  active: any;
  steps = [{index: 0, enable: true, img: 'assets/img/stepper_img/1.png'}, {index: 1, enable: false, img: 'assets/img/stepper_img/2.png'},
    {index: 2, enable: false, img: 'assets/img/stepper_img/3.png'}, {index: 3, enable: false, img: 'assets/img/stepper_img/4.png'}];
  currentStep = 0;

  constructor() { }

  stepper(step: any) {
    if (step.enable) {
      this.currentStep = step.index;
    }
  }

  next(){
    if (this.steps.length > this.currentStep){
      this.currentStep++;
      this.steps[this.currentStep].enable = true;
    }
  }

  prev(){
    if (0 < this.currentStep){
      this.currentStep--;
    }
  }
}

