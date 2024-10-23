import {Component, Input, OnInit} from '@angular/core';
import {UtilService} from '../../services/util.service';
import {Booking} from '../../models/booking';
import {AlertController, ModalController} from '@ionic/angular';
import {ViewerModalComponent} from 'ngx-ionic-image-viewer';
import * as moment from 'moment';
import {APIService} from '../../services/api.service';
import {SessionService} from '../../services/session.service';
import {FormBuilder, Validators} from '@angular/forms';
import {CompleteBookingPage} from '../complete-booking/complete-booking.page';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss'],
})
export class OrderViewComponent implements OnInit {

  @Input() booking: Booking;
  editMode = false;
  progress = false;
  startProject = this.formBuilder.group({
    start : [Validators.required],
    end: [Validators.required]
  });
  constructor(public util: UtilService, public modalController: ModalController, private api: APIService, public session: SessionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(this.booking);
    this.startProject.patchValue({
      start: this.booking.start,
      end: this.booking.end
    });
  }

  async openViewer(src) {
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {src},
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }

  applyForOrder(id) {
    this.progress = true;
    const body = {
      status: 'APPLIED',
      company: this.session.getCompany().id
    };
    this.api.updateBooking(id, body).subscribe( data => {
      console.log('Applied successfully', data);
      this.api.getBookingDetails(this.booking.id).subscribe( resp => {
        this.booking = resp;
        this.progress = false;

      }, error => {
        console.log('An error occurred while getting  order', error);
        this.progress = false;
      });
    }, error => {
      console.log('An error occurred while applying for order', error);
      this.progress = false;

    });
  }


  startAppliedProject(id) {
    const body = {
      status: 'ONGOING',
      start: this.startProject.value.start,
      end: this.startProject.value.end
    };
    this.api.updateBooking(id, body).subscribe(data => {
      console.log('Applied successfully', data);
      this.api.getBookingDetails(this.booking.id).subscribe(resp => {
        this.booking = resp;
        this.editMode = false;
        this.progress = false;
        }, error => {
        console.log('An error occurred while getting  order', error);
        this.progress = false;
      });
    }, error => {
      console.log('An error occurred while applying for order', error);
      this.progress = false;
    });
  }

  completeProject() {
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CompleteBookingPage,
      cssClass: 'my-custom-class',
      componentProps: {
        id: this.booking.id
      }
    });

    modal.onDidDismiss()
        .then((data) => {
           this.booking = data.data; // Here's your selected user!
        });
    return await modal.present();
  }
}
