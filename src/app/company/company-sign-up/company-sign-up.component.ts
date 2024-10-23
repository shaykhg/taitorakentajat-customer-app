import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataShareService} from '../../services/data-share.service';
import {APIService} from '../../services/api.service';
import {SessionService} from '../../services/session.service';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-company-sign-up',
  templateUrl: './company-sign-up.component.html',
  styleUrls: ['./company-sign-up.component.scss'],
})
export class CompanySignUpComponent implements OnInit {
  public getAns;
  public exp;

  constructor(private util: UtilService, private route: Router, public data: DataShareService,
              private api: APIService, private session: SessionService) {}

  ngOnInit() {
  }

  moveNextOne(name) {
    console.log(name.value);
    this.data.company.question.one.ans = name.value;
    this.data.company.question.two.enable = true;
    this.data.company.question.one.enable = false;
  }

  moveNextTwo() {
    this.data.company.question.two.ans = this.getAns;
    this.data.company.question.three.enable = true;
    this.data.company.question.two.enable = false;
  }

  async moveNextThree() {
    await this.util.presentLoading();
    this.data.company.question.three.ans = this.exp;
    this.data.company.question.four.enable = true;
    this.data.company.question.three.enable = false;
    this.moveNextLast();

  }

  moveNextLast() {
     const body = {
        name: this.data.company.question.one.ans,
        // address: this.userDetail.get('address').value,
        // city: 'Helsinki',
        // staff: [],
        // postcode: this.userDetail.get('postcode').value,
        admins: [this.session.getUser().id]
      };
     console.log('this is the body for company', body);
     this.api.addCompanies(body).subscribe(data => {
        console.log(data);
        this.session.setCompany(data);
        this.api.updateAccount(this.session.getUser().id, {company: data.id}).subscribe(async resp => {
         await this.session.setUser(resp);
         await this.util.dismissLoading();
         await this.util.presentToast('User detail added successfully');
         // this.data.company.question.one.enable = false;
         // this.data.company.question.two.enable = false;
         // this.data.company.question.three.enable = false;
         // this.data.company.question.four.enable = false;

         this.route.navigate(['/tabs/dashboard']);
        }, error => {
          this.util.dismissLoading();
          this.util.presentToast('An error occurred while adding company');
        });
        console.log('this is user after setting company', this.session.getUser());

      }, error => {
        console.error(error.message);
        this.util.dismissLoading();
        this.util.presentToast('Error while adding user detail');
      });
  }

}
