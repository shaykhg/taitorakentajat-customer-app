import { Component, OnInit } from '@angular/core';
import {APIService} from '../../services/api.service';
import {SessionService} from '../../services/session.service';
import {UtilService} from '../../services/util.service';
import {Router} from '@angular/router';
import {DataShareService} from '../../services/data-share.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit{
public myOrder = [] ;

  constructor(private api: APIService, private session: SessionService,
              public util: UtilService, private route: Router, private data: DataShareService) {}

  ngOnInit(): void {
  }


  ionViewDidEnter() {
    this.getBookingsData();
  }

  getBookingsData(): void {
    console.log(this.session.getToken());
    this.api.getMyBookings().subscribe(data => {
      console.log('Get Bookings', data);
      this.myOrder = _.map(data, item => {
        const mItem = item;
        console.log('Current', item);
        mItem.disDate = this.util.getIndianDate(item.date);
        mItem.disTime = this.util.getTime(item.date);
        mItem.disServices = item.services ? (item.services.length > 1 ?
          `${item.services[0].name} and ${item.services.length - 1} more` :
          item.services[0].name) : 'No Service Selected';
        return mItem;
      });
    }, error => {
      console.log(error.message);
      this.util.presentSnackBar(error.message);
    });
  }


  orderDetails(order: any) {
    console.log('opening details', order);

    this.data.currentOrder = order;
    this.route.navigateByUrl('/booking-details/' + order.id );
  }
}
