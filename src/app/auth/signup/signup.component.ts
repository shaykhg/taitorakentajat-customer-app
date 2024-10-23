import { Component, OnInit } from '@angular/core';
import {APIService} from '../../services/api.service';
import {FormBuilder, Validators } from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {UtilService} from '../../services/util.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUp: any;
  constructor(private formBuilder: FormBuilder, private api: APIService, private session: SessionService,
              private util: UtilService, private route: Router) { }

  ngOnInit(): void {
    this.signUp  =  this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required,  Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required,  Validators.minLength(8)]]
    });
  }

  onSubmit(): any {
    const body = {
      name: this.signUp.value.name,
      username: this.signUp.value.email,
      email: this.signUp.value.email,
      password: this.signUp.value.password
    };

    console.log('Removed cnf pass', body);
    this.api.register(body).subscribe(  async res => {
        console.log('User SignUp Successful::', res);
        this.api.patchAccount(res.user.id).subscribe(async data => {
        console.log('this is response of patch request', data);
        // const loginResult = await this.api.login({identifier: body.email, password: body.password}).toPromise();
        // console.log(loginResult);
        await this.session.setToken(res.jwt);
        await this.session.setUser(data);
        await this.api.setToken(res.jwt);
        await this.route.navigateByUrl('/');
      }, error => {
        console.log('an error occurred while patching account', error);
      });

    }, error => {
      console.log('An error occurred in signup', error);
      this.util.presentToast('User Registration Failed');
    });
  }
}
