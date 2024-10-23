import {Component, Inject, OnInit} from '@angular/core';
import {SessionService} from '../services/session.service';
import {Router} from '@angular/router';
import {APIService} from '../services/api.service';
import {UtilService} from '../services/util.service';
import * as _ from 'lodash';
import {DataShareService} from '../services/data-share.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from '@angular/material/bottom-sheet';
import {CompanyFilterComponent} from './company-filter/company-filter.component';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  myOrder: any = [];
  showFilters = false;
  filters = {
    sort: {
      price: '',
      name: ''
    },
    brands: [],
    range: 0.00,
    applied: false
  };
  filterData: HttpParams;

  constructor(private bottomSheet: MatBottomSheet, public session: SessionService, private router: Router,
              private api: APIService, public util: UtilService, private data: DataShareService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (!this.session.getUser().company && this.session.getUser().role === 'Company') {
      this.router.navigateByUrl('/company/company-signup');
    } else {
      this.getBookingsData();
    }
  }

  getBookingsData(): void {
    console.log(this.session.getToken());
    this.api.getApprovedBookings().subscribe(data => {
      this.api.getCompanyBookings(this.session.getCompany().id).subscribe(book => {
        const allBooking = book.concat(data);
        this.myOrder = _.map(allBooking, item => {
          const mItem = item;
          mItem.disDate = this.util.getIndianDate(item.date);
          mItem.disTime = this.util.getTime(item.date);
          mItem.disServices = item.services ? (item.services.length > 1 ?
            `${item.services[0].name} and ${item.services.length - 1} more` :
            item.services[0].name) : 'No Service Selected';
          return mItem;
        });
      }, err => {
        console.log('error', err);
      });
    }, error => {
      console.log(error.message);
      this.util.presentSnackBar(error.message);
    });
  }

  orderDetails(order: any) {
    this.data.currentOrder = order;
    this.router.navigateByUrl('/booking-details/' + order.id );
  }

  /**
   * Open filter view which is incorporated in a bottom sheet
   */
  openFilter() {
    this.bottomSheet
      .open(CompanyFilterComponent, { data: this.filterData, panelClass: 'filter-bottom-sheet'})
      .afterDismissed()
      .subscribe((result) => {
        if (result.filter){
          this.filterData = result.params;
          this.applyFilters();
        } else {
          if (result.clear){
            this.getBookingsData();
          }
        }
      });
  }

  private applyFilters() {
    this.filterData.append('approved', String(true));
    this.api.getBookings(this.filterData).subscribe(data => {
      this.myOrder = _.map(data, item => {
        const mItem = item;
        mItem.disDate = this.util.getIndianDate(item.date);
        mItem.disTime = this.util.getTime(item.date);
        mItem.disServices = item.services ? (item.services.length > 1 ?
          `${item.services[0].name} and ${item.services.length - 1} more` :
          item.services[0].name) : 'No Service Selected';
        return mItem;
      });
    });
  }

}
