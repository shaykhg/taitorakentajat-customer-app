import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import {AppConstants} from '../AppConstants';
import * as moment from 'moment';
import {City} from '../models/City';

@Injectable({
  providedIn: 'root',
})

/**
 * This service is used to make the API calls,
 * this service sets the auth header by default and this can be disabled
 * from constructor and setToken function, this App uses https://reqres.in/ for mock APIs
 */
export class APIService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private session: SessionService) {
    console.log('headers', this.session.getToken());
    this.headers = new HttpHeaders();
    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.session.getToken()
    );
    this.session.auth.subscribe(user => {
      this.headers = this.headers.set(
        'Authorization',
        'Bearer ' + this.session.getToken()
      );
    });
  }

  /**
   * To set the token after initialisation of the service, could be useful when user is not logged in
   * and then when he logins this function can be called to add token
   * @param token this contains the user email and password
   */
  setToken(token: string) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Authorization', 'Bearer ' + token);
  }

  /**
   * To Login a user
   * @param body this contains the user email and password
   */
  login(body: any) {
    return this.http.post<any>(AppConstants.API.LOGIN, body);
  }

  /**
   * To Login a user
   * @param body this is the object which contains user info such as email, password, name etc.
   */
  register(body: any) {
    return this.http.post<any>(AppConstants.API.REGISTER, body);
  }

  /** Get a user information based on his id
   * @param userId User id to identify user
   */
  // getUser(userId: string): Observable<User> {
  //   return this.http.get<User>(AppConstants.API.GET_USER + userId);
  // }

  /**
   * This function get the data from JSON file for now, later on will be replaced by an API Call
   * @returns Tasks and WishList
   */
  getList() {
    return this.http.get<any>('../../../assets/json/list-data.json');
  }

  /**
   * This function get the Product list from JSON file for now, later on will be replaced by an API Call
   * @returns products
   */
  getProductList() {
    return this.http.get<any>('../../../assets/json/product-list-data.json');
  }


  getServices(): any{
    return this.http.get(AppConstants.API.SERVICES + '?enable=true');
  }

  getPostCode(postCode): Observable<any>{
    return this.http.get(AppConstants.API.POSTCODE + `?postcode=${postCode}`);
  }

  getAllCities(): Observable<City[]>{
    return this.http.get<City[]>(AppConstants.API.POSTCODE + `?_limit=4000`);
  }

  getAllBlogs(): Observable<any[]>{
    return this.http.get<any[]>(AppConstants.API.BLOGS);
  }

  getPackages(serviceId, key): any{
    if (key){
      return this.http.get(AppConstants.API.PACKAGES + '?enable=true&service=' + serviceId  + '&key=' + key);
    } else {
      return this.http.get(AppConstants.API.PACKAGES + '?enable=true&service=' + serviceId);
    }
  }
  getSlots(city): any{
    const date = moment().startOf('day').toISOString();
    return this.http.get(AppConstants.API.SLOTS + `?available=true&city=${city.toLowerCase()}&date_gt=${date}`);
  }

  /**
   * This Function used to upload images from client to server
   * @param body Body containing image
   */
  uploadImage(body: FormData): Observable<any>{
    return this.http.post(AppConstants.API.UPLOAD_IMAGES, body);
  }

  placeBooking(body): any{
    return this.http.post(AppConstants.API.PLACE_BOOKING, body);
  }

  getMyBookings(): Observable<any>{
    return this.http.get(AppConstants.API.MY_BOOKINGS, {headers: this.headers});
  }

  updateAccount(id, body): Observable<any>{
    return this.http.put(AppConstants.API.ACCOUNTS + '/' + id, body, {headers: this.headers});
  }

  createStaff(body): Observable<any>{
    return this.http.post(AppConstants.API.CREATESTAFF, body, {headers: this.headers});
  }

// /companies
  addCompanies(body): Observable<any>{
    return this.http.post(AppConstants.API.COMPANIES, body, {headers: this.headers});
  }
  updateCompany(body): Observable<any>{
    return this.http.put(AppConstants.API.COMPANIES + '/' + this.session.getCompany().id, body, {headers: this.headers});
  }
  getCompanies(): Observable<any>{
    return this.http.get(AppConstants.API.COMPANIES, {headers: this.headers});
  }

  getCompanyDetails(companyId: any): Observable<any> {
    return this.http.get(AppConstants.API.COMPANIES + '/' + companyId, {headers: this.headers});
  }

  updateProfile(userId: any, body): Observable<any> {
    return this.http.patch(AppConstants.API.PROFILE + '/' + userId, body, {headers: this.headers});
  }

  /**
   * This function used to get all the order details that user has done
   */
  getBooking(): Observable<any>{
    return this.http.get(AppConstants.API.BOOKING, {headers: this.headers});
  }

  /**
   * This function used to get all approved orders
   */
  getApprovedBookings(): Observable<any>{
    return this.http.get(AppConstants.API.BOOKING + '?approved=true', {headers: this.headers});
  }

  /**
   * This function used to company orders
   */
  getCompanyBookings(id): Observable<any>{
    return this.http.get(AppConstants.API.BOOKING + '?company=' + id, {headers: this.headers});
  }

  getBookings(params: HttpParams): Observable<any>{
    return this.http.get(AppConstants.API.BOOKING, {params, headers: this.headers});
  }

  addUser(body): Observable<any> {
    return this.http.post(AppConstants.API.USERS, body, {headers: this.headers});
  }

  patchAccount(userId, roles?): Observable<any> {
    // return this.http.patch(AppConstants.API.ACCOUNTS + '/' + id, body);
    return this.http.patch(AppConstants.API.ACCOUNTS + '/'  + userId, roles ? {role: roles} :  {});
  }

  updateUser(id, body): Observable<any> {
    return this.http.patch(AppConstants.API.PROFILE + '/' + id, body, {headers: this.headers});
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(AppConstants.API.FORGOT_PASSWORD, {email});
  }

  resetPassword(password: string, code: string): Observable<any> {
    return this.http.post<any>(AppConstants.API.RESET_PASSWORD, {password, code, passwordConfirmation: password});
  }

  getBookingDetails(id: string): Observable<any> {
    return this.http.get(AppConstants.API.BOOKING + '/' + id, {headers: this.headers});
  }

  postReview(body): Observable<any>{
    return this.http.post<any>(AppConstants.API.POST_REVIEW, body);
  }

  checkExistingReview(id): Observable<any>{
    return this.http.get<any>(AppConstants.API.REVIEW_EXIST + '/' + id);
  }

  getProduct(product: string) {
    return this.http.get(AppConstants.API.PRODUCT + product);
  }

  updateBooking(id, body): Observable<any> {
    return this.http.put(AppConstants.API.BOOKING + '/' + id, body, {headers: this.headers});
  }

  markOrderComplete(id) {
    return this.http.patch(AppConstants.API.BOOKING_COMPLETE +  id, {}, {headers: this.headers});
  }
}
