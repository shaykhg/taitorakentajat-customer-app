import {Component, Input, OnInit} from '@angular/core';
import {GroundWork} from '../../../models/groundWork';
import {Color} from '../../../models/colors';
import {RoofMaterial} from '../../../models/roofMaterial';
import {RoofIncension} from '../../../models/roofIncension';
import {BaseWork} from '../../../models/baseWork';
import {FormBuilder, Validators} from '@angular/forms';
import {DataShareService} from '../../../services/data-share.service';

@Component({
  selector: 'app-custom-services',
  templateUrl: './custom-services.component.html',
  styleUrls: ['./custom-services.component.scss']
})
export class CustomServicesComponent implements OnInit {
  @Input() chooseService: any;


  public addedServiceData = this.dataShare.apiService;

  selectedColor: any;
  selectedValue: string;
  selectedMaterial: any;
  selectedBaseWork: any;
  public meterSq;
  public waterproofing: any;
  public demolition: any;
  public refurbishment: any;
  public waterPoint: any;
  public renovate: any;
  public stove: any;
  public benches: any;
  public door: any;
  public selectedIncension: any;

  public hideServiceBtn = false;

  groundWorks: GroundWork[] = [
    {value: 'maintenance-painting-only,-so-not-much', viewValue: 'Maintenance Painting Only, So Not Much'},
    {value: 'there-is-some-groundWork', viewValue: 'There Is Some GroundWork'},
    {value: 'there-is-a-lot-of-groundwork', viewValue: 'There Is A Lot Of Groundwork'}
  ];

  colors: Color[] = [
    {
      value: 'yes, i\'d-like-to-change-the-color-of-the-house.',
      viewValue: 'Yes, I\'d like to change the color of the house.', price: 200
    },
    {
      value: 'no, i did\'t-want-to-change-the-color-of-the-house.',
      viewValue: 'No, I did\'t want to change the color of the house.', price: 50
    }
  ];

  roofMaterial: RoofMaterial[] = [
    {value: 'tin-roof', viewValue: 'Tin Roof', price: 10},
    {value: 'felt-roof', viewValue: 'Felt Roof', price: 20},
    {value: 'brick-roof', viewValue: 'Brick  Roof', price: 30}
  ];

  roofIncension: RoofIncension[] = [
    {value: 'flat', viewValue: 'Flat', price: 30},
    {value: 'gentle', viewValue: 'Gentle', price: 20},
    {value: 'semi-grain', viewValue: 'Semi-Grain', price: 10},
    {value: 'steep', viewValue: 'Steep', price: 50},
  ];
  baseWork: BaseWork[] = [
    {value: 'maintenanc-painting-only-so-not-much', viewValue: 'Maintenance Painting Only, So Not Much', price: 10},
    {value: 'there-is-some-groundwork', viewValue: 'There Is Some Groundwork', price: 20},
    {value: 'there-is-lot-of-groundwork', viewValue: 'There Is Lot Of Groundwork', price: 30},
  ];

  roofRenovationForm = this.formBuilder.group({
    meterSquare: ['', [Validators.required]],
    roofMaterial: ['', [Validators.required]],
    roofIncension: ['', [Validators.required]]
  });

  exteriorPainting = this.formBuilder.group({
    meterSquare: ['', [Validators.required]],
    groundWork: ['', [Validators.required]],
    paint: ['', [Validators.required]]
  });

  interiorPainting = this.formBuilder.group({
    meterSquare: ['', Validators.required],
    baseJob: ['', [Validators.required]],
    paint: ['', [Validators.required]]
  });

  saunaRenovation = this.formBuilder.group({
    meterSquare: ['', Validators.required],
    benches: ['', Validators.required],
    stove: ['', Validators.required],
    door: ['', Validators.required]
  });

  bathroomReno = this.formBuilder.group({
    meterSquare: ['', Validators.required],
    water: ['', Validators.required],
    oldStructure: ['', Validators.required],
    waterproofing: ['', Validators.required],
    refurbishment: ['', Validators.required],

  });
  public selectedServicePrice: any;


  constructor(private formBuilder: FormBuilder, public dataShare: DataShareService) {
  }

  ngOnInit(): void {
    // console.log(this.selectedValue);
    console.log('Added Service::', this.dataShare.apiService);

  }

  formatLabel(value: number): any {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }


  getMeterSq($event, type: number): any {
    console.log($event.value);
    this.meterSq = $event.value;
    if (type === 1) {
      this.dataShare.tempService.roofAreaPrice = this.dataShare.tempService.price * this.meterSq;
    } else if (type === 2) {
      this.dataShare.tempService.bathroomRenovation = this.dataShare.tempService.price * this.meterSq;
    } else if (type === 3) {
      this.dataShare.tempService.interiorPainting = 50 * this.meterSq;
    } else if (type === 4) {
      this.dataShare.tempService.areaPrice = this.dataShare.tempService.price * this.meterSq;
    }
    console.log(this.meterSq);
  }

  getWaterPoints($event): any {
    this.waterPoint = $event.value;
    $event.price = 10;
    this.dataShare.tempService.noOfPointsPrice = $event.price * this.waterPoint;
    console.log(this.waterPoint);
    console.log($event);
  }

  getServices($event, type: number): any {
    if (type === 1 && $event.checked) {
      $event.value = {
        demolition: 'Demolition of old structures',
        price: 10
      };
      this.demolition = $event.value.demolition;
      this.dataShare.tempService.oldStructurePrice = $event.value.price;
      console.log(this.demolition);
    } else if (type === 2 && $event.checked) {
      $event.value = {
        waterproofing: 'Smoothing, waterproofing, tiling',
        price: 10
      };
      this.waterproofing = $event.value.waterproofing;
      this.dataShare.tempService.smoothingPrice = $event.value.price;
      console.log(this.waterproofing);
    } else if (type === 3 && $event.checked) {

      $event.value = {
        refurbishment: 'Refurbishment of the sauna',
        price: 10
      };
      this.refurbishment = $event.value.refurbishment;
      this.dataShare.tempService.refurbishmentPrice = $event.value.price;
      console.log(this.refurbishment);
    } else if (type === 1 && !$event.checked) {
      $event.value = {
        demolition: '',
        price: 0
      };
      this.demolition = $event.value.demolition;
      this.dataShare.tempService.oldStructurePrice = $event.value.price;
    } else if (type === 2 && !$event.checked) {
      $event.value = {
        waterproofing: '',
        price: 0
      };
      this.waterproofing = $event.value.waterproofing;
      this.dataShare.tempService.smoothingPrice = $event.value.price;
    } else if (type === 3 && !$event.checked) {
      $event.value = {
        refurbishment: '',
        price: 0
      };
      this.refurbishment = $event.value.refurbishment;
      this.dataShare.tempService.refurbishmentPrice = $event.value.price;
    }
    console.log($event);
  }

  renovation($event): any {
    this.renovate = $event.value;
    this.dataShare.tempService.saunaRenovationPrice = this.dataShare.tempService.price * this.renovate;
    console.log(this.renovate);
  }

  addSaunaRenovation($event, type: number): any {

    if (type === 1 && $event.checked) {
      $event.value = {
        benches: 'New Benches',
        price: 10
      };
      this.benches = $event.value.benches;
      this.dataShare.tempService.newBenchesPrice = $event.value.price;

    } else if (type === 2 && $event.checked) {
      $event.value = {
        stove: 'New Stove',
        price: 10
      };
      this.stove = $event.value.stove;
      this.dataShare.tempService.newStovePrice = $event.value.price;


    } else if (type === 3 && $event.checked) {
      $event.value = {
        door: 'New Door',
        price: 10
      };
      this.door = $event.value.door;
      this.dataShare.tempService.newDoorPrice = $event.value.price;

    } else if (type === 1 && !$event.checked) {
      $event.value = {
        benches: '',
        price: 0
      };
      this.benches = $event.value.benches;
      this.dataShare.tempService.newBenchesPrice = $event.value.price;
    } else if (type === 2 && !$event.checked) {
      $event.value = {
        stove: '',
        price: 0
      };
      this.stove = $event.value.stove;
      this.dataShare.tempService.newStovePrice = $event.value.price;
    } else if (type === 3 && !$event.checked) {
      $event.value = {
        door: '',
        price: 0
      };
      this.door = $event.value.door;
      this.dataShare.tempService.newDoorPrice = $event.value.price;
    }

    console.log($event.checked);


  }

  /**
   * Add service based on its type
   * @param type Type of the service (viewType)
   */
  addServices(type: number): any {

    const data: any = {
      name: this.dataShare.serviceValue.name,
      desc: this.dataShare.serviceValue.description,
      id: this.dataShare.serviceValue.id,
      viewType: this.dataShare.serviceValue.viewType,
      sqm: this.meterSq,
      price: this.addServicePrice(this.dataShare.serviceTotal)
    };

    if (type === 1) {
      data.groundWork = this.exteriorPainting.get('groundWork').value;
      data.paint = this.exteriorPainting.get('paint').value;
    } else if (type === 2) {
      data.material = this.roofRenovationForm.get('roofMaterial').value;
      data.incension = this.roofRenovationForm.get('roofIncension').value;
    } else if (type === 3) {
      data.waterPoint = this.waterPoint;
      data.demolition = this.demolition;
      data.waterproofing = this.waterproofing;
      data.refurbishment = this.refurbishment;
    } else if (type === 4) {
      data.saunaRenovation = this.renovate;
      data.door = this.door;
      data.benches = this.benches;
      data.stove = this.stove;
      data.meterSq = this.saunaRenovation.get('meterSquare').value;
    } else if (type === 5) {
      data.baseJob = this.interiorPainting.get('baseJob').value;
      data.paint = this.interiorPainting.get('paint').value;
    }
    this.dataShare.order.services.push(data);
    this.dataShare.calculateTotal();
    console.log('This is Added Service', this.dataShare.order.services);
    this.dataShare.addFormVisible = !this.dataShare.addFormVisible;
    // this.hideAddedService = !this.hideAddedService;

    this.hideServiceBtn = !this.hideServiceBtn;
  }

  addOptionsAmountView4(type: any, service: any): void {
    console.log('this is change', type, service);
    if (type === 1) {
      this.dataShare.tempService.baseJobPrice = service.price;
    } else if (type === 2) {
      this.dataShare.tempService.sameColorPrice = service.price;
    }
  }

  addOptionsAmountView1(type: any, service: any): void {
    console.log('this is change', type, service);
    if (type === 1) {
      this.dataShare.tempService.roofMaterialPrice = service.price;
    } else if (type === 2) {
      this.dataShare.tempService.roofIncensionPrice = service.price;
    } else if (type === 3) {
      this.dataShare.tempService.roofIncensionPrice = service.price;
    } else if (type === 4) {
      this.dataShare.tempService.roofIncensionPrice = service.price;
    }
  }

  addServicePrice(price): any {
    this.selectedServicePrice = price;
    return isNaN(price) ? 0 : price;
  }

  calculatePrice(): void{
    if (this.chooseService.viewType === 1) {
      let value = this.meterSq * 50;
      console.log(value, this.selectedMaterial ? this.selectedMaterial.price + value : 0);
      value = this.selectedMaterial ? this.selectedMaterial.price + value : 0;
      console.log(value, this.selectedIncension ? this.selectedIncension.price + value : 0);
      value = this.selectedIncension ? this.selectedIncension.price + value : 0;
      this.dataShare.serviceTotal = value;
    } else if (this.chooseService.viewType === 2){

    } else if (this.chooseService.viewType === 3){

    } else if (this.chooseService.viewType === 4){
      let value = this.meterSq * 50;
      value = this.selectedBaseWork ? this.selectedBaseWork.price + value : 0;
      value = this.selectedColor ? this.selectedColor.price + value : 0;
      this.dataShare.serviceTotal = value;
    }
  }

}
