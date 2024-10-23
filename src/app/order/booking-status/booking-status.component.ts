import { Component, OnInit } from '@angular/core';
import {UtilService} from '../../services/util.service';
import {DataShareService} from '../../services/data-share.service';

@Component({
  selector: 'app-booking-status',
  templateUrl: './booking-status.component.html',
  styleUrls: ['./booking-status.component.scss']
})
export class BookingStatusComponent implements OnInit {

  date = '';

  constructor(public data: DataShareService, public util: UtilService) { }

  ngOnInit(): void {
    if (this.data.time){
      this.date = this.util.getHumanDateTime(this.data.time.start);
    } else {
      this.date = this.util.getIndianDate(this.data.order.scheduleContactForm.date) + ' ' + this.data.order.scheduleContactForm.time;
      console.log('this date', this.data.order.scheduleContactForm.date, this.data.order.scheduleContactForm.time);

    }
  }

}
