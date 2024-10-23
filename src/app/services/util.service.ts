import { HostListener, Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  Platform,
  ToastController,
} from '@ionic/angular';
import * as moment from 'moment';
import * as _ from 'lodash';
import {ClipboardService} from 'ngx-clipboard';
import {AppConstants} from '../AppConstants';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

/**
 * This services contains variables and functions which
 * are required globally in multiple components
 */
export class UtilService {
  public isDesktop = false;
  public innerWidth = window.innerWidth;
  public IMAGE_BASE_URL = AppConstants.BASE_URL;
  loading: HTMLIonLoadingElement;
  BASE_URL = AppConstants.BASE_URL;
  constructor(
    private platform: Platform,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private clipboardService: ClipboardService,
    private snackBar: MatSnackBar
  ) {
    this.isDesktop = this.platform.is('desktop');
    console.log('Desktop ? ', this.isDesktop);
  }

  @HostListener('window:resize', ['$event'])

  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log('this is innerwidht', this.innerWidth);
  }

  /**
   * This function supply status colors based on status text for meetings page
   * @param bookingStatus Status of the meeting
   */
  // public getStatus(bookingStatus: string) {
  //   const status = bookingStatus.toLowerCase();
  //   if (status === 'pending') {
  //     return '#ff5722';
  //   } else if (status === 'completed') {
  //     return '#00701a';
  //   } else if (status === 'scheduled') {
  //     return '#006db3';
  //   } else if (status === 'ongoing') {
  //     return '#9c27b0';
  //   } else if (status === 'failed') {
  //     return '#f44336';
  //   } else {
  //     return '#212121';
  //   }
  // }

  public getStatus(bookingStatus: string): any {
    status = bookingStatus.toUpperCase();
    console.log('this is status', status);
    if (status === 'CANCELLED' || status === 'CANCELLED_BY_CUSTOMER' || status === 'FAILED') {
      return {status, primary: '#f64e60', secondary: '#ffe2e5'};
    } else if (status === 'PENDING') {
      return {status, primary: '#ff9800', secondary: '#fff4de'};
    } else if (status === 'ONGOING') {
      return {status, primary: '#3699ff', secondary: '#e1f0ff'};
    } else if (status === 'APPLIED') {
      return {status, primary: '#8950fc', secondary: '#eee5ff'};
      //    yellow
    } else if (status === 'READY') {
      return {status, primary: '#ff7043', secondary: '#eee5ff'};
    } else if (status === 'APPROVED') {
      return {status, primary: '#1bc5bd', secondary: '#c9f7f5'};
    } else if (status === 'REJECTED') {
      return {status, primary: '#93329e', secondary: '#f8a1d1'};
    } else if (status === 'COMPLETED') {
      return {status, primary: '#1fab89', secondary: '#9df3c4'};
    } else {
      return {status, primary: '#3d84a8', secondary: '#bad7df'};
    }
  }

  public groupBy(dataToGroupOn, fieldNameToGroupOn, fieldNameForGroupName, fieldNameForChildren): any {
    return _.chain(dataToGroupOn)
      .groupBy(fieldNameToGroupOn)
      .toPairs()
      .map((currentItem) => {
        return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
      }).value();
  }

  /**
   * This function supply status colors based on status for meetings product listing
   * @param status availability of the product
   */
  public getProductStatus(status: number) {
    if (status === 1) {
      return 'green';
    } else if (status === 2) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  /**
   * This function can be used to display alerts by passing
   * title and message.
   * @param title Title of your message
   * @param message Message which you want to display
   * @param subtitle Optional field, used to display subtitle of dialog
   */
  async presentAlert(title: string, message: string, subtitle?: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      subHeader: subtitle ? subtitle : null,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  /**
   * This function can be used to created alert with custom button
   * and actions
   * @param positive Name of the positive button
   * @param negative Name of the negative button
   * @param message Message content to be displayed on alert
   * @param title Title of the message
   * @param subtitle Subtitle of the alert
   */
  async presentAlertConfirm(
    positive,
    negative,
    message,
    title,
    subtitle?: string
  ) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: title,
        subHeader: subtitle ? subtitle : null,
        message,
        buttons: [
          {
            text: negative,
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: positive,
            handler: () => {
              resolve(true);
            },
          },
        ],
      });
      await alert.present();
    });
  }

  /**
   * This function is to be used to display ion toast or snackbar style
   * message using ToastController
   * @param message This is the text which will be displayed on snackbar
   * @param time This is the duration for how long message should be visible
   */
  async presentToast(message: string, time: number = 2000) {
    const toast = await this.toastController.create({
      message,
      duration: time,
    });
    await toast.present();
  }

  /**
   * This is to be used to display an alert style progress
   * for an ongoing event or API calls, you should call dismissLoading
   * function to dismiss the dialogue
   * @param message Text of what message needs to displayed
   */
  async presentLoading(message: string = 'Please wait...') {
    this.loading = await this.loadingController.create({
      message,
    });
    await this.loading.present();
  }

  async copyToClipBoard(text: string, msg: string = 'Text copied to clipboard successfully!'){
    this.clipboardService.copy(text);
    await this.presentToast(msg);
  }

  /**
   * Dismiss the existing loading bar displaying currently
   */
  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  public titleCase(text): string {
    return text.replace(/\w\S*/g,  (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }


  public getIndianDate(date): string {
    return moment(date).format('DD-MMM-YYYY');
  }

  /**
   * Get date in this format :: 24th May 2018, 02:54 PM
   * @param date Date with time
   */
  public getHumanDateTime(date): string {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  }

  /**
   * This function can be used to restrict an input field of text type to accept only number
   * to be used like this onkeypress="return isNumberKey(event)"
   * @param evt Event of key press
   */
  public isNumberKey(evt): boolean {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode !== 46 && charCode > 31
      && (charCode < 48 || charCode > 57));
  }

  /**
   * Display a snack bar
   * @param msg Message to be displayed
   * @param duration Duration of message, how long it should be on screen
   */
  public presentSnackBar(msg: string, duration = 5000): void {
    this.snackBar.open(msg, null, {duration});
  }

  public getTime(date): string {
    return moment(date).format('HH:mm');
  }

  /**
   * Format Label to include k in thousands
   * @param value Number which needs to be formatted
   */
  formatLabel(value: number): any {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  /**
   * Round off a number to n decimal digits
   * @param num Number itself
   * @param places Places e.g; 2 for 11.24
   */
  public roundTo(num: number, places: number): number {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  }

  /**
   * Round off a number with Ceil
   * @param num Number which needs to be round off
   */

  ceil(num: number): number {
    return Math.ceil(num);
  }
}
