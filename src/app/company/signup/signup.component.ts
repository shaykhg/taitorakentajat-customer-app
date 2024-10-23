import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {APIService} from '../../services/api.service';
import {Router} from '@angular/router';
import {UtilService} from '../../services/util.service';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm  = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,  Validators.minLength(8)]],
    cpassword: ['', [Validators.required,  Validators.minLength(8)]],
  });

  constructor(private formBuilder: FormBuilder, private api: APIService,
              private route: Router, private util: UtilService, private session: SessionService  ) { }

  ngOnInit() {}

  onSubmit(){
    const password = this.signUpForm.get('password').value;
    const cpassword = this.signUpForm.get('cpassword').value;

    if ( password === cpassword && this.signUpForm.valid) {
      const body: any = {
        name: this.signUpForm.get('name').value,
        username: this.signUpForm.get('email').value,
        email: this.signUpForm.get('email').value,
        password
      };
      this.api.register(body).subscribe(async data => {
        console.log('this is data of company registration');
        this.api.patchAccount(data.user.id, 'Company').subscribe(async resp => {
          // const loginResult = await this.api.login({identifier: body.email, password: body.password}).toPromise();
          // console.log('this is login resp', loginResult);
          await this.session.setToken(data.jwt);
          await this.session.setUser(resp);
          await this.api.setToken(data.jwt);
          await this.route.navigateByUrl('/');
          await this.route.navigate(['/company/company-signup']);
          console.log('this is patch account response', resp);
        }, error => {
          console.log('an error occurred while patching account', error);
        });
;
        }, async error => {
        await this.util.presentToast(error.message);
        console.error(error.message);
      });

    } else {
      if (password === cpassword) {
      this.util.presentToast('Passwords do not match');
      }
      else {
        this.util.presentToast('Please correct form errors!');
      }
    }
  }

}
