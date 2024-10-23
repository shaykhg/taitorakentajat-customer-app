import { Component, OnInit } from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {DataShareService} from '../../services/data-share.service';
import * as _ from 'lodash';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-floor-repair',
  templateUrl: './floor-repair.component.html',
  styleUrls: ['./floor-repair.component.scss'],
})
export class FloorRepairComponent implements OnInit {

  service;
  totalPrice = 0;
  hideServiceBtn = false;

  constructor(public data: DataShareService, private util: UtilService) { }

  ngOnInit(): void {
    console.log(this.data.serviceValue);
    for (const param of this.data.serviceValue.params){
      param.value = '';
    }
    this.service = this.data.serviceValue;
  }

  formatLabel(value: number): any {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'm2';
    }

    return value;
  }

  isInvalid(): boolean{
    for (const val of this.data.serviceValue.params){
      if (!val.value){
        return true;
      }
    }
    return false;
  }

  async addService(): Promise<void> {
    const exists = !!_.find(this.data.order.services, {id: this.service.id});
    const confirm = exists ? await this.util.presentAlertConfirm('Yes', 'No', 'This service already exists in order, this will overwrite existing service.', 'Are you sure?') : true;
    if (confirm){
      const service: any = {};
      for (const param of this.data.serviceValue.params) {
        service[param.key] = param.value;
        if (param.type === 'm2') {
          service.area = param.value;
        }
      }
      service.id = this.data.serviceValue.id;
      service.name = this.data.serviceValue.name;
      service.viewType = this.data.serviceValue.viewType;
      service.price = this.totalPrice;
      const material = _.find(this.data.serviceValue.params, {key: 'New Material'});
      service.key = material.value;
      // Overwrite if needed
      this.data.order.services = _.filter(this.data.order.services, (item) => item.id !== service.id);
      this.data.order.services.push(service);
      this.data.calculateTotal();
      console.log(this.data.addFormVisible, this.hideServiceBtn);
      this.data.addFormVisible = false;
      this.hideServiceBtn = !this.hideServiceBtn;
    }
  }

  selection($event: MatSelectChange, param): void {
    console.log('Has price', param.options[0]);
    if (param.options[0].price){
      // has price need to add
      for (const val of  param.options){
        if (val.value === $event.value){
          param.price = val.price;
        }
      }
    }
    this.calculatePrice();
  }

  calculatePrice(): void {
    const area = _.find(this.data.serviceValue.params, {type: 'm2'});
    const price = _.sumBy(this.data.serviceValue.params, 'price');
    this.totalPrice = area.value * price;
    console.log(area, price);
  }
}
