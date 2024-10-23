import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {APIService} from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,  Validators.min(7)]]
  });

  constructor(private fb: FormBuilder, private api: APIService, private route: Router) { }

  ngOnInit() {}

  // onSubmit(){
  //   const body = this.loginForm.value;
  //   this.api.login(body).subscribe(data => {
  //     console.log(data);
  //     this.route.navigateByUrl('/');
  //   }, error => {
  //     console.error(error.message);
  //   });
  //
  // }

}
