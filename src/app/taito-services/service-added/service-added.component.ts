import {Component, Input, OnInit} from '@angular/core';
import {DataShareService} from '../../services/data-share.service';
import * as _ from 'lodash';
import {APIService} from '../../services/api.service';

@Component({
  selector: 'app-service-added',
  templateUrl: './service-added.component.html',
  styleUrls: ['./service-added.component.scss']
})
export class ServiceAddedComponent implements OnInit {


  panelOpenState = false;

  constructor(public data: DataShareService, public api: APIService) {
  }

  ngOnInit(): void {
  }



  removeService(service): any{
    console.log('Remove', service, this.data.order.services);
    this.data.order.services = _.filter(this.data.order.services, item => item.id !== service.id);
    console.log('Post Remove', this.data.order.services);
    this.data.calculateTotal();
  }

  getServiceProps(service): any[]{
    let arr = Object.keys(service).map(key => ({ key, value: service[key] }));
    arr = _.filter(arr, (obj) => (obj.key !== 'id' && obj.key !== 'viewType' && obj.key !== 'area'));
    service.arr = arr;
    return arr;
  }

}
