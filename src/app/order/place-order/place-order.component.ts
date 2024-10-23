import { Component, OnInit } from '@angular/core';
import {DataShareService} from '../../services/data-share.service';
import {FormBuilder, Validators} from '@angular/forms';
import {APIService} from '../../services/api.service';
import {Router} from '@angular/router';
import {UtilService} from '../../services/util.service';
import {SessionService} from '../../services/session.service';
import {MatDialog} from '@angular/material/dialog';
import {TermAndConditionPage} from '../../term-and-condition/term-and-condition.page';
import {CancellationPolicyPage} from '../../cancellation-policy/cancellation-policy.page';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  ImageToUpload: File = null;
  imageUrl = {
    one: '',
    two: '',
    three: '',
    four: '',
  };
  imageFile = {
    one: '',
    two: '',
    three: '',
    four: '',
  };
  uploadForm = new FormData();


  placeOrder = this.formBuilder.group({
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required,  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    notes: ['', [Validators.max(250)]],
    termAccept: ['', [Validators.required]],
    cancellation: ['', [Validators.required]]
  });
  public termAndCondition;
  public policy;
  addImage = false;
  constructor(private session: SessionService, private api: APIService, public data: DataShareService,
              private formBuilder: FormBuilder, private route: Router, private utils: UtilService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.postOrder();
    console.log(this.data.slotId);
  }

  ionViewDidEnter() {
    window.scroll(0, 0);
  }


  get f(){
    return this.placeOrder.controls;
  }

  getProductImg(files: FileList): any{
    // console.log($event.target.files);


    this.ImageToUpload = files.item(0);
    console.log('Image DATA', files.item(0));

  }

  onFileChange(event, which): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = (mFile) => {

        this.imageUrl[which] = reader.result as string;
        this.imageFile[which] = file;

        this.uploadForm.append('files', file);
        this.addImage = true;

      };

    }
  }
  removeImage(img): any {
    this.imageUrl[img] = '';
    this.imageFile[img] = null;
    this.uploadForm = new FormData();
    for (const key of Object.keys(this.imageFile)) {
      if (key) {
        this.uploadForm.append('files', this.imageFile[key]);
      }
    }
  }

  async imageUpload() {
    // show progress
    await this.utils.presentLoading();
    this.data.loading = true;
    if (this.addImage) {
      console.log('this is upload form', this.uploadForm);
      this.api.uploadImage(this.uploadForm).subscribe(res => {
        console.log('Response Of Image Upload::', res);
        this.data.order.images = res;
        this.postOrder();
      }, async error => {
        this.data.loading = false;
        await this.utils.dismissLoading();
        this.utils.presentToast('Error While Uploading Images!');
      });
    } else {
      await this.utils.dismissLoading();
      this.postOrder();

    }

  }

 async postOrder() {
    console.log('this is user', this.session.getUser(), this.session.isLoggedIn);
    const body: any = {
     propertyType: this.data.order.customerDetails.propertyType, // Type of property
     propertySize: this.data.order.customerDetails.propertySize.toString(), // Size of property
     building: this.data.order.customerDetails.street, // Street and Building address
     buildingYear: this.data.order.customerDetails.building, // Street and Building address
     postcode: this.data.order.customerDetails.postCode, // Postcode
     total: this.data.order.totalPrice, // Total
     status: 'PENDING', // Total
     city: this.data.order.customerDetails.city, // City of customer
     // experience: this.data.order.customerDetails.experienceLevel, // Experience needed for work
     // companySize: this.data.order.customerDetails.companySize, // Size of company
     packages: this.data.order.packages, // Packages choosed by customer
     images: this.data.order.images, // Images of propertycontactPhone
     buySelf: this.data.order.productHandle.buySelf, // Customer Will buy self
     assist: this.data.order.productHandle.assist, // New assistance to buy products
     notes: this.placeOrder.get('notes').value, // notes
     fname: this.placeOrder.get('fname').value, // First Name
     lname: this.placeOrder.get('lname').value, // Last Name
     email: this.placeOrder.get('email').value, // Email Customer
     phone: this.placeOrder.get('phone').value, // Phone Customer
     services: this.data.order.services, // Choosen Services Array in JSON
     timeNotFound: this.data.order.timeNotFound, // If customer do not found time
   };

    if (this.data.time){
        body.time = this.data.time;
        body.slotId = this.data.slotId;
        body.serviceMan = this.data.time.user;
        body.date = this.data.time.date;
    }

    if (this.data.renovationTime){
     body.renovation = this.data.contactDate.toISOString(); // Date when renovation starts
     // body.renovation = this.utils.noTimeISOString(body.renovation);
   }

    if (this.data.slotId){
     body.slot = this.data.slotId; // Slot object
     body.serviceMan = this.data.serviceMan; // ServiceMan Account
     body.date = this.data.time.start; // Date when customer wants to see service man
   }
   //
   // if (this.data.order.timeNotFound){
   //    body.customerTime = this.data.order.scheduleContactForm;
   //  }

    if (body.timeNotFound) {
     body.contactEmail = this.data.order.scheduleContactForm.email; // Email where user wants to be contacted when they arrive
     body.contactPhone = this.data.order.scheduleContactForm.phone.toString(); // Phone when user want to be contacted when serviceMan arrives
     const date: Date = this.data.order.scheduleContactForm.date;
     date.setHours(+this.data.order.scheduleContactForm.time.split(':')[0]);
     date.setMinutes(+this.data.order.scheduleContactForm.time.split(':')[1]);
     body.date = date.toISOString(); // Date when customer wants to see service man
   }


    console.log('Form Submitted::', body);
    this.api.placeBooking(body).subscribe(async data => {
      this.data.loading = false;
      await this.utils.dismissLoading();
      this.data.orderData = data;

      this.route.navigateByUrl('/booking-status');
      console.log('Order placed successfully@');
    }, async error => {
      this.data.loading = false;
      await this.utils.dismissLoading();
      await this.utils.presentAlert('Booking Failed', 'Hi, there is an error occurred while placing your booking request');
      console.log('An error occurred while placing booking!', error);
    });
  }

  getTermAccept($event) {
    this.termAndCondition = $event.checked;
  }

  getPolicy($event) {
    this.policy = $event.checked;
  }


  openDialog() {
    this.dialog.open(TermAndConditionPage);
  }
  openPolicy(){
    this.dialog.open(CancellationPolicyPage);
  }


}
