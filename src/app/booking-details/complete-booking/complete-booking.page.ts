import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SessionService} from '../../services/session.service';
import {UtilService} from '../../services/util.service';
import {DataShareService} from '../../services/data-share.service';
import {APIService} from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-complete-booking',
  templateUrl: './complete-booking.page.html',
  styleUrls: ['./complete-booking.page.scss'],
})
export class CompleteBookingPage implements OnInit {
  public uploadForm = new FormData();
  ImageToUpload: File = null;
  imageUrl = {
    one: '',
    two: '',
    three: '',
    four: '',
  };
  private addImage = false;
  @Input() id: string;
  private images: any = [];
  notes = '';
  constructor(public router: Router, public modalController: ModalController, public session: SessionService, public util: UtilService,
              private data: DataShareService, private api: APIService) { }

  ngOnInit() {
    console.log('this is id', this.id);
  }


  onFileChange(event, which): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = (mFile) => {

        this.imageUrl[which] = reader.result as string;

        this.uploadForm.append('files', file);
        this.addImage = true;
      };

    }
  }

  async imageUpload() {
    // show progress
    await this.util.presentLoading();
    this.data.loading = true;
    if (this.addImage) {
      console.log('this is upload form', this.uploadForm);
      this.api.uploadImage(this.uploadForm).subscribe(res => {
        console.log('Response Of Image Upload::', res);
        this.images = res;
        this.completeOrder();
      }, async error => {
        this.data.loading = false;
        await this.util.dismissLoading();
        this.util.presentToast('Error While Uploading Images!');
      });
    } else {
      this.completeOrder();
    }

  }

  async  completeOrder() {
    const id = this.id;
    const body = {
      status: 'COMPLETED',
      finalPhotos: this.images,
      companyNotes : this.notes
    };
    this.api.updateBooking(id, body).subscribe( async data => {
      console.log('this booking is complete now', data);
      await this.util.dismissLoading();
      this.modalController.dismiss(data);

    }, async error => {
      console.log('An error occurred', error);
      await this.util.dismissLoading();

    });
  }

}
