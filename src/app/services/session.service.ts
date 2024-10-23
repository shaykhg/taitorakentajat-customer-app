import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
// import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';

@Injectable({
  providedIn: 'root'
})

/**
 * This service is used to keep the things related to Auth,
 * so user info, token and things like that can be kept here
 */
export class SessionService {

  private token: string;
  private user: any;
  public isLoggedIn = false;
  // public auth = new BehaviorSubject<boolean>(null);
  public auth = new ReplaySubject(1);
  public ready = false;
  private company: any;

  constructor(private storage: LocalStorageService) {
    // Get all info from localstorage
    this.init().then(() => {
      console.log('Session service is read!');
    }).catch((e) => {
      console.log('Unable to init session service', e);
    });
  }

  /**
   * To be used to set token.
   * @param token - The token post received post login.
   */
  async setToken(token: string) {
    this.token = token;
    await this.storage.setString('token', token);
    await this.storage.setBoolean('loggedIn', true);
  }

  /**
   * To be used to set user.
   * @param user - The user object.
   */
  async setUser(user: any) {
    console.log('this is user', user);
    this.user = user;
    this.isLoggedIn = true;
    this.auth.next(true);
    await this.storage.setObject('user', user);
  }

  /**
   * To be used to set user.
   * @param company Company object
   */
  async setCompany(company: any) {
    console.log('this is company', company);
    this.company = company;
    await this.storage.setObject('company', company);
  }

  /** This function can be used to get token */
  getToken() {
    return this.token;
  }

  /** This function can be used to get user */
  getUser() {
    return this.user;
  }

  /** This function can be used to get company */
  getCompany() {
    return this.company;
  }

  /** Logout current user */
  async logout() {
    this.isLoggedIn = false;
    await this.storage.delete('user');
    await this.storage.delete('token');
    await this.storage.delete('loggedIn');
    await this.storage.delete('company');
    this.token = '';
    this.auth.next(false);
  }

  /** This function is private and should not be used for anything else than init of session service */
  private async init() {
    this.isLoggedIn = await this.storage.getBoolValue('loggedIn');
    console.log('Logged in', this.isLoggedIn);
    this.user = await this.storage.getObjValue('user');
    this.token = await this.storage.getStringValue('token');
    this.company = await this.storage.getObjValue('company');
    console.log(this.company);
    console.log('Auth loaded is ', this.isLoggedIn);

    // Dummy allowed access intentionally remove this block
   // this.isLoggedIn = true;
    // Remove this block if prod
    console.log('Auth is ', this.isLoggedIn, this.token);
    this.ready = true;
    this.auth.next(this.isLoggedIn);
    // We can also optionally call refresh token API is available to refresh the token
  }
}
