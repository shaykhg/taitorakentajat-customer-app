import { Component, OnInit } from '@angular/core';
import {APIService} from '../services/api.service';
import {UtilService} from '../services/util.service';
import {DataShareService} from '../services/data-share.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss']
})
export class OrderDetailsPage implements OnInit {

  public myOrderDetails = [];

  public orderShow = false;

  constructor(private api: APIService, public util: UtilService, public data: DataShareService) { }

  ngOnInit(): void {
    // this.myOrderDetail();
     console.log('This is current order****', this.data.currentOrder);
  }


  // async myOrderDetail(): Promise<any>{
  //   await this.util.presentLoading();
  //
  //   this.api.getBooking().subscribe( async data => {
  //     console.log('myOrder', data);
  //     this.myOrderDetails = data;
  //     console.log(this.myOrderDetails);
  //     await this.util.dismissLoading();
  //   }, error => {
  //     console.log(error.message);
  //     this.util.dismissLoading();
  //     this.util.presentToast('Error while getting order details');
  //   });
  // }

}
