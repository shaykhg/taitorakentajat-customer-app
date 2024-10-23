import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment/moment';
import * as _ from 'lodash';
import {any} from 'codelyzer/util/function';
import {City} from '../models/City';

@Injectable({
  providedIn: 'root'
})
/**
 * This service allows sharing data between components.
 */
export class DataShareService {

  // It will be used to know whether customer form is filled or not
  public customerReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  orderData: any;
  order = {
    property: {
      type: '0',
      size: 0
    },
    services: [],
    packages: [],
    time: {},
    customerDetails: {
      city: 'helsinki',
      propertyType: '',
      propertySize: '',
      street: '',
      building: '',
      postCode: '',
      // experienceLevel: '',
      // companySize: ''
    },
    images: [],
    productHandle: {
      buySelf: false,
      assist: false
    },
    totalPrice: 0,

    timeNotFound: false,

    scheduleContactForm: {
      phone: '',
      email: '',
      date: new Date(),
      time: ''
    }

  };
  serviceTotal = 0;
  cities = [];

  filters = {
    dateSort: undefined,
    priceSort : undefined,
    price : undefined,
    start: undefined,
    end: undefined,
    cities : []
  };

  company: any = {
     question : {
      one: {enable: true, qus: 'What is the name of your company?', ans: ''},
      two: {enable: false, qus: 'What is the size of your organization?', ans: ''},
      three: {enable: false, qus: '', ans: ''},
      four: {enable: false}
    },
    addUser: {
       name: '',
      email: '',
      role: '',
      customerId: '',
    },
    companyData: []
  };

  public tempService;
  public profileImage;
  public currentOrder;
  public progress = 0;
  public completed = false;
  public slotId;
  public addSlot;
  public addFormVisible = true;
  public userName;
  public selectedDate;
  public contactDate;

  public serviceDetail;

  public companySize;

  public experienceLevel;

  public serviceData;

  public apiService;
  getCheckValue;

  public renovationTime;

  public serviceValue;

  public selectedIndex = 0;
  loading = false;
  step = {
    addService: false,
    selectPackages: false,
    selectTime: false,
    placeOrder: false
  };
  time: any;
  public tabChange: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  getServiceUrl = new BehaviorSubject({});
  serviceMan: any;
  slot: any;


  constructor() {
  }


  /**
   * This function can be used to make the total the order at any point of time
   */
  calculateTotal(): void {
    const servicePrice = _.sumBy(this.order.services, (o) => o.price);
    const packagePrice = _.sumBy(this.order.packages, (o) => o.price);
    this.order.totalPrice = servicePrice + packagePrice;
  }

  setRenoDate(): string {
    return moment(this.selectedDate).format('DD-MMM-YYYY');
  }

}
