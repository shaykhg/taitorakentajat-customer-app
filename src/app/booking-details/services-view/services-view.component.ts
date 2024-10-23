import {Component, Input, OnInit} from '@angular/core';
import {Booking} from '../../models/booking';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-services-view',
  templateUrl: './services-view.component.html',
  styleUrls: ['./services-view.component.scss'],
})
export class ServicesViewComponent implements OnInit {

  @Input() booking: Booking;

  constructor(public util: UtilService) { }

  ngOnInit() {}

}
