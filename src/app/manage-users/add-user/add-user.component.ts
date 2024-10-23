import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {APIService} from '../../services/api.service';
import {DataShareService} from '../../services/data-share.service';
import {UtilService} from '../../services/util.service';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {stringifyTask} from '@angular/compiler-cli/ngcc/src/execution/tasks/utils';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addUserForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    cnfPassword: ['', [Validators.required, Validators.minLength(8)]],
    role: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private api: APIService, public data: DataShareService,
              private util: UtilService, public session: SessionService, private route: Router) {
  }

  ngOnInit() {
    this.getCompaniesData();
    console.log('this is company', this.session.getCompany());
  }

  getCompaniesData() {
    this.api.getCompanies().subscribe(data => {
      console.log('company data', data);
      this.data.company.companyData = data;
    }, error => {
      this.util.presentToast('Error while loading user data');
    });
  }


  onSubmit() {
    const body = {
      name: this.addUserForm.value.name,
      username: this.addUserForm.value.email,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
    };
    console.log(body);
    if (this.addUserForm.valid && body.password === this.addUserForm.value.cnfPassword) {
      this.api.addUser(body).subscribe(data => {
        console.log('this is reg data', data);
        this.updateCompanies(data);
      }, error => {
        console.error(error.message);
        this.util.presentToast('Error while adding user');
      });
    } else {
      if (this.addUserForm.valid) {
        this.util.presentToast('Password and confirm password do not match!');
      }
    }
  }

  async updateCompanies(data) {
    const staff = this.session.getCompany().staff;

    this.api.patchAccount(data.id, 'Staff').subscribe(async resp => {
      this.api.updateAccount(resp.id, {company: this.session.getCompany().id}).subscribe( result => {
        console.log('Account updated with company success', result);
      }, error => {
        console.log('error occurredd while Account updated with company success', error);
      });
      console.log('this is patch data', resp);
      staff.push(resp.id);
      this.api.updateCompany({staff}).subscribe(async res => {
        const company = await this.api.getCompanyDetails(this.session.getCompany().id).toPromise();
        await this.session.setCompany(company);
        await this.util.presentToast('User created successfully');
        await this.route.navigate(['/tabs/manage-users']);
        console.log('Staff is updated in company', res);
      }, error => {
        console.log('an error occurred while updating staff', error);
      });
      console.log('this is response of patch request', resp);
    }, error => {
      console.log('an error occurred while patching account', error);
    });
  }

}
