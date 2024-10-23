import { Component, OnInit } from '@angular/core';
import {SessionService} from '../services/session.service';
import {APIService} from '../services/api.service';
import * as _ from 'lodash';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {UtilService} from '../services/util.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {

  constructor(private util: UtilService, public session: SessionService, private api: APIService, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.session.getUser().company) {
       console.log('this is staff',  this.session.getCompany().staff);
    } else {
      this.router.navigateByUrl('/company/company-signup');
    }
  }
  async deleteAlert(user) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure you want to delete this user',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteUser(user);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteUser(users) {
    _.remove(this.session.getCompany().staff, users);
    this.session.setCompany(this.session.getCompany());

    this.api.updateCompany({staff : this.session.getCompany().staff }).subscribe( data => {
      this.util.presentToast('User deleted successfully');
    }, error => {
      this.util.presentToast('Error occurred while deleting user');
    });

  }
}
