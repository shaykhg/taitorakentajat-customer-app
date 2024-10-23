import {Component} from '@angular/core';
import {SessionService} from '../services/session.service';
import {Router} from '@angular/router';
import {NotificationsService} from '../services/notifications.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router, public session: SessionService, private notification: NotificationsService) {
    if (session.ready) {
      this.checkUserType();
    } else {
      this.session.auth.subscribe(value => {
        if (session.ready) {
          this.checkUserType();
        }
      });
    }
  }

  checkUserType() {
    if (this.session.isLoggedIn) {
      if (this.session.getUser().role !== 'Customer') {
        this.router.navigateByUrl('/tabs/dashboard');
      }
    }
  }

  ionViewDidEnter() {
    this.session.getUser();
  }

}
