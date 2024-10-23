import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DataShareService} from '../../services/data-share.service';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilService} from '../../services/util.service';
import {APIService} from '../../services/api.service';
import {StepperService} from '../../services/stepper.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  @Input() url = '';

  // public serviceValue: '';
  public fresh;
  public intermediate;
  public size;
  postcodeError = false;
  customerDetailForm = this.formBuilder.group({
    street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    building: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    postCode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    property: ['', [Validators.required]],
    size: ['', [Validators.required]],
    // experienceLevel: ['', [Validators.required]],
    // companySize: ['', [Validators.required]]
  });
  private property;
  selectedService;
  constructor(public util: UtilService, public dataShare: DataShareService, private api: APIService,
              private formBuilder: FormBuilder, public stepper: StepperService, private change: ChangeDetectorRef) {
    this.dataShare.getServiceUrl.subscribe((val) => {
      if (val) {
        this.getService();
      }
    });
  }

  ngOnInit(): void {
    console.log('Add service is loading now in on init%%%%%%%%%%%%%%%%%%%%%%%%%');
    this.getService();
    console.log(this.dataShare.serviceValue);
    setTimeout(() => {
      console.log('will scroll now');
      window.scroll(150, 150);
    }, 100);
  }

  ionViewDidEnter() {
    console.log('Add service is ion view init%%%%%%%%%%%%%%%%%%%%%%%%%');

  }

  formatLabel(value: number): any {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }


  changeValue($event): void {
    console.log('Service Change', $event.value);
    this.dataShare.serviceTotal = 0.00;
    this.dataShare.serviceValue = $event.value;
    this.dataShare.addFormVisible = true;
  }

  companySize($event): any {
    this.dataShare.companySize = $event.value;
  }

  addExperienceLevel($event): any {
    this.dataShare.experienceLevel = $event.value;
  }

  getMeterSq($event): any {
    console.log($event.detail.value);
    this.size = $event.detail.value;
    this.dataShare.order.customerDetails.propertySize = this.size;
    // this.change.detectChanges();

  }


  getService(): any {
    this.api.getServices().subscribe(data => {

        // console.log(data);
        this.dataShare.apiService = data;
        if (this.url && this.url.length > 0){
          this.selectedService = _.find(data, {url: this.url});
          if (this.selectedService){
            this.dataShare.serviceValue = this.selectedService;
            this.dataShare.addFormVisible = true;
          }
        }
        console.log('This is service data::', this.dataShare.apiService);
      },
      error => {
        console.log(error.message);
      }
    );


  }

  propertyType($event): void {
    this.property = $event.value;
    this.dataShare.order.customerDetails.propertyType = this.property;

  }

  moveNext(): void {
    if (!this.customerDetailForm.valid) {
      console.log('Form is not valid!');
      return;
    }
    // check if all data is valid
    this.dataShare.order.customerDetails = {
      propertyType: this.customerDetailForm.get('property').value,
      propertySize: this.customerDetailForm.get('size').value,
      street: this.customerDetailForm.get('street').value,
      postCode: this.customerDetailForm.get('postCode').value,
      city: this.customerDetailForm.get('city').value,
      building: this.customerDetailForm.get('building').value
      // experienceLevel: this.customerDetailForm.get('experienceLevel').value,
      // companySize: this.customerDetailForm.get('companySize').value
    };
    console.log('Customer Details', this.dataShare.order.customerDetails);
    this.dataShare.customerReady.next(true);
    this.dataShare.progress = 40;
    this.stepper.steps[1].enable = true;
    this.stepper.next();

    // setTimeout(() => {
    //   this.dataShare.selectedIndex = 1;
    //
    // } , 30);
  }

  // getPostCode(): void{
  //   const postCode = this.customerDetailForm.get('postCode').value;
  //   this.api.getPostCode(postCode).subscribe(data => {
  //     console.log(data);
  //   });
  // }
  onSearchChange(value): void {
    if (value.value.length === 5) {
      this.getPostCode(value.value);
    }
  }

  getPostCode(postCode): void{
    this.api.getPostCode(postCode).subscribe(data => {
      if (data.length > 0){
        this.postcodeError = false;
        this.customerDetailForm.get('city').patchValue(this.util.titleCase(data[0].name));
      } else {
        this.postcodeError = true;
        this.customerDetailForm.get('city').setErrors({incorrect: true});
        this.util.presentToast('It appears to be a invalid postcode!');
      }
    });

  }
}
