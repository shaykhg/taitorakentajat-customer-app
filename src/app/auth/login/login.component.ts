import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APIService} from '../../services/api.service';
import {Router} from '@angular/router';
import {SessionService} from '../../services/session.service';
import {DataShareService} from '../../services/data-share.service';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userName;

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: APIService, private router: Router,
              private session: SessionService, private data: DataShareService, private util: UtilService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      identifier: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    console.log(this.session.getUser());
  }

  onSubmit(): any {
    const body = this.loginForm.value;
    this.apiService.login(body).subscribe(async res => {
        if (!res.user.account) {
          await this.patAccount(res);
        }

        if (res.user.account.role !== 'Service'){
          console.log('Login Successfully!', res);
          await this.session.setToken(res.jwt);
          await this.session.setUser(res.user.account);
          await this.apiService.setToken(res.jwt);
          console.log('setting user', this.session.getUser());
          if (this.session.getUser().role === 'Staff' || this.session.getUser().role === 'Company') {
            // Get company details first
            console.log('I am here');
            if (this.session.getUser().company) {
              const company = await this.apiService.getCompanyDetails(this.session.getUser().company).toPromise();
              console.log('this is company', company);
              await this.session.setCompany(company);
              await this.router.navigate(['/tabs/dashboard']);
            } else {
              if (this.session.getUser().role === 'Staff') {
                await this.session.logout();
                await this.util.presentAlert('Login Error', 'Your user is set to Staff type but your profile does not contain any company!, Please contact admin for more details');
              } else {
                await this.router.navigate(['/company/company-signup']);
              }
            }
          } else if (this.session.getUser().role === 'Customer') {
            console.log('I am here going home');
            await this.router.navigate(['/']);
          } else {
            await this.router.navigate(['/']);
          }
        } else {
          await this.util.presentAlert('Login Error', 'Hi, please use service application, this app is only for Customer/Company!');
        }


      },
      error => {
        this.util.presentToast('Login Failed! User Credential Is Incorrect');
      }
    );
  }

  async patAccount(res) {
    this.apiService.patchAccount(res.user.id, {role: 'Customer'}).subscribe(data => {
      console.log('this is response of patch request');
    }, error => {
      console.log('an error occurred while patching account');
    });
  }

}
