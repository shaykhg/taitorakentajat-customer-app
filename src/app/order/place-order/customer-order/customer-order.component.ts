import { Component, OnInit } from '@angular/core';
import {DataShareService} from '../../../services/data-share.service';
import {UtilService} from '../../../services/util.service';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss'],
})
export class CustomerOrderComponent implements OnInit {

  constructor(public data: DataShareService, public util: UtilService) { }

  ngOnInit() {}

  removeService(): any{
    this.data.order.services.splice(0, 1);
  }

}
