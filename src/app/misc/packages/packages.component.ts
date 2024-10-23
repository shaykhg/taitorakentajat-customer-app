import {Component, OnInit} from '@angular/core';
import {DataShareService} from '../../services/data-share.service';
import {APIService} from '../../services/api.service';
import {StepperService} from '../../services/stepper.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  public disableProduct = false;
  public disableBuyProduct = false;
  public products = [];
  servicePrice: any = 0;
  packagePrice: any;

  constructor(public dataShare: DataShareService, private api: APIService, public stepper: StepperService) {
  }

  ngOnInit(): void {

    console.log(this.dataShare.order.totalPrice);
    console.log('tab 2');
    // this.getApiPackages();
  }
  ionViewDidEnter() {
    window.scroll(0, 0);
  }

  formatLabel(value: number): any {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  //
  // getApiPackages(): any {
  //   this.api.getPackages().subscribe(data => {
  //       console.log('This Is Package Data', data);
  //       this.products = data;
  //       console.log('DataShare Package::', this.dataShare.order.package);
  //     },
  //     error => console.log(error.massage));
  // }


  disablePackage($event, type: number): any {
    console.log($event);
    console.log('Services added', this.dataShare.order.services);

    if (type === 1) {
      this.disableProduct = $event.checked;
      this.dataShare.order.productHandle.buySelf = this.disableProduct || false;
      console.log(this.dataShare.order.productHandle.buySelf);
      this.dataShare.order.packages = [];
      this.dataShare.calculateTotal();


    } else if (type === 2) {
      this.disableBuyProduct = $event.checked;
      this.dataShare.order.productHandle.assist = this.disableBuyProduct || false;
      this.dataShare.order.packages = [];
      this.dataShare.calculateTotal();

    }

  }

  // buyProduct($event): any {
  //   console.log($event);
  //
  // }


  moveNextTab(): void {
    this.dataShare.step.selectPackages = true;
    this.dataShare.tabChange.next(2);
    this.dataShare.progress = 70;
    this.stepper.steps[2].enable = true;
    // setTimeout(() => this.dataShare.selectedIndex = 2, 300);
  }

  disableBtn(): any {
    if (!this.disableProduct && !this.disableBuyProduct && !this.dataShare.getCheckValue) {
      return true;
    }
  }

  movePrevTab(): void {
    this.dataShare.selectedIndex = 0;
    console.log('Tab index changed', this.dataShare.selectedIndex);
  }
}
