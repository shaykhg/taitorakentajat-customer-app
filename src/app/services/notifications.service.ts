import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import {SessionService} from './session.service';
import {APIService} from './api.service';
import {Router} from '@angular/router';
import {Capacitor} from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private router: Router, private session: SessionService, private api: APIService) {
    if (Capacitor.platform === 'ios' || Capacitor.platform === 'android'){
      this.init();
    }
  }

  init(){

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(async result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
        // Received token update it on server
        if (this.session.isLoggedIn) {
          setTimeout(() => this.updateToken(token.value), 1000);
        }
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        // alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
       // alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
      console.log(notification.notification.data);
      this.router.navigateByUrl(`/review/${notification.notification.data.booking}/${notification.notification.data.user}`);
        // alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  /**
   * Update notifications token on server
   * @param token FCM Token
   */
  updateToken(token: string){
    this.api.updateUser(this.session.getUser().id, {token})
      .subscribe(user => {
        console.log('Updated token on server~', user);
        this.session.setUser(user);
      }, error => {
        console.log('Unable to update token due to an error!', error);
      });
  }
}
