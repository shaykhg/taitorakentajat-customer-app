import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {APIService} from '../../services/api.service';
import {UtilService} from '../../services/util.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user-details',
  templateUrl: './add-user-details.component.html',
  styleUrls: ['./add-user-details.component.scss'],
})
export class AddUserDetailsComponent implements OnInit {
  userDetail = this.fb.group({
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    postcode: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, public session: SessionService, private api: APIService, private util: UtilService, private route: Router) {
  }

  ngOnInit() {
  }


  onSubmit() {
    if (this.userDetail.valid) {
      const body = {
        name: this.session.getUser().name,
        address: this.userDetail.get('address').value,
        city: this.userDetail.get('city').value,
        postcode: this.userDetail.get('postcode').value,
        admins: [{
          name: this.session.getUser().name,
          email: this.session.getUser().email,
          userId: this.session.getUser().id
        }],
      };
      this.api.addCompanies(body).subscribe(data => {
        console.log(data);

        this.util.presentToast('User detail added successfully');
        this.route.navigate(['/tabs/dashboard']);
      }, error => {
        console.error(error.message);
        this.util.presentToast('Error while adding user detail');
      });
    }

  }
}
