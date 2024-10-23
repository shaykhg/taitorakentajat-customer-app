import { Component, OnInit } from '@angular/core';
import {StepperService} from '../services/stepper.service';
import {DataShareService} from '../services/data-share.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  constructor(public stepper: StepperService, public data: DataShareService) { }

  ngOnInit() {}

}
