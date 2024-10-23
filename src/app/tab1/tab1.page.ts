import {Component, OnInit} from '@angular/core';
import {SessionService} from '../services/session.service';
import {DataShareService} from '../services/data-share.service';
import {StepperService} from '../services/stepper.service';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {UtilService} from '../services/util.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public completed = false;
  url = '';
  progress = false;
  loadAgain = true;



  constructor(public dataShare: DataShareService, public session: SessionService, public stepper: StepperService,
              private route: ActivatedRoute, public util: UtilService) {}

  ngOnInit(): void {
    this.dataShare.tabChange.subscribe(data => {
      setTimeout(() => window.scroll(0, 0), 300);
    });
    setTimeout(() => {
      this.loadAgain = false;
      }, 100);
  }

  ionViewDidEnter() {
    this.progress = true;
    console.log(this.session.getUser());
    moment(this.dataShare.selectedDate).format('DD/MM/YYYY');
    setTimeout(() => this.loadAgain = true, 100);
    this.route.queryParams.subscribe(data => {
      this.url = data.url;
    });
    console.log('This is url', this.url);
    console.log('Tab 2 is loading now');
    this.progress = false;
    console.log('Html will load now');
    window.scroll(0, 0);
  }

}
