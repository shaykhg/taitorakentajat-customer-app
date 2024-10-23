import {Component, OnInit} from '@angular/core';
import {SessionService} from '../services/session.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {APIService} from '../services/api.service';
import {UtilService} from '../services/util.service';
import {DataShareService} from '../services/data-share.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  nameField = false;

  profileForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    phone: [''],
    email: ['', [Validators.required, Validators.email]],
    city: [''],

  });
  public imageUrl: any;
  uploadForm = new FormData();
  ImageToUpload: string = null;
  hideBtn = false;
  public avatar: string;


  constructor(public session: SessionService, public util: UtilService, private formBuilder: FormBuilder,
              private route: Router, private api: APIService, public data: DataShareService) {
  }

  ionViewDidEnter(){
    console.log('getUser', this.session.getUser());
    this.formValue();
  }

  ngOnInit(): void {
  }

  formValue() {
    this.profileForm.patchValue({
      name: this.session.getUser().name,
      phone: this.session.getUser().phone,
      email: this.session.getUser().email,
      city: this.session.getUser().city
    });
  }


  logout() {
    this.session.logout();
    this.route.navigateByUrl('/auth/login');
  }

  editProfile() {
    this.profileForm.enable();
    this.nameField = !this.nameField;
    this.hideBtn = ! this.hideBtn;
  }

   updateProfile(uploadComplete: boolean = false) {
    if (this.imageUrl && !uploadComplete){
      this.imageUpload();
    } else {
      const body: any = {
        name: this.profileForm.get('name').value,
        email: this.profileForm.get('email').value,
        phone: this.profileForm.get('phone').value,
        city: this.profileForm.get('city').value
      };
      if (uploadComplete){
        body.avatar = this.avatar;
      }
      this.api.updateProfile(this.session.getUser().id, body).subscribe(async data => {
        console.log(data);
        await this.session.setUser(data);
        await this.util.dismissLoading();
        await this.util.presentToast('Profile updated successfully');
      }, async error => {
        await this.util.dismissLoading();
        await this.util.presentToast(error.message);
      });
      this.nameField = !this.nameField;
      this.profileForm.disable();
      this.hideBtn = ! this.hideBtn;
    }
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = (mFile) => {

        this.imageUrl = reader.result as string;

        this.uploadForm.append('profileImg',  file);

      };
      console.log('About to upload on api', this.uploadForm);
      // this.imageUpload();
    }
  }

  async imageUpload() {
    // show progress
    await this.util.presentLoading('Updating profile...');
    this.data.loading = true;
    this.api.uploadImage(this.uploadForm).subscribe(res => {
      console.log('Response Of Image Upload::', res);
      this.avatar = res.files[0].filename;
      this.updateProfile(true);
    }, async error => {
      this.data.loading = false;
      await this.util.dismissLoading();
      await this.util.presentToast('Error While Uploading Images!');
    });
  }

  changeLang(lang) {
    console.log(lang.value);
    this.util.presentToast('This feature not yet available!');
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const body = {
        name: this.session.getUser().name,
        address: this.profileForm.get('address').value,
        city: this.profileForm.get('city').value,
        postcode: this.profileForm.get('postcode').value,
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
    } else {
      this.util.presentToast('Please correct form errors!');
    }

  }

}
