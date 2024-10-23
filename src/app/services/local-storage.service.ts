import {Injectable} from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})

/**
 * This service is used to save the data into localstorage,
 * this service can also encrypt and decrypt on demand
 * Underneath this service uses Ionic LocalStorage To Save Data
 */
export class LocalStorageService {

  ready = false;

  constructor() {
  }

  private catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  }


  /**
   * To be used to set boolean value in localstorage.
   * @param key - This is the key under which our value will be saved
   * @param value - This the value which we want to save in storage
   */
  async setBoolean(key: string, value: boolean) {
    await Storage.set({key, value: String(value)});
  }

  // /**
  //  * To be used to set objects in localstorage.
  //  * @param key - This is the key under which our value will be saved
  //  * @param value - This the value which we want to save in storage
  //  */
  // setObject(key: string, value: any) {
  //   this.catchAsync(async () => {
  //     const save = await Storage.set({key, value: JSON.stringify(value)});
  //     console.log('Object is saved', save);
  //   });
  // }
  //


  /**
   * To be used to set number in localstorage.
   * @param key - This is the key under which our value will be saved
   * @param value - This the value which we want to save in storage
   */
  setNumber(key: string, value: number) {
    this.catchAsync(async () => {
      await Storage.set({key, value: String(value)});
    });
  }

  /**
   * To be used to set string in localstorage.
   * @param key - This is the key under which our value will be saved
   * @param value - This the value which we want to save in storage
   */
  async setString(key: string, value: string) {
    await Storage.set({key, value});
  }



  /**
   * To be used to get String values from localstorage except objects.
   * @param key - This is the key under which data is saved
   */
  async getStringValue(key: string): Promise<any> {
    const {value} = await Storage.get({key});
    return value;
  }
  /**
   * To be used to get String values from localstorage except objects.
   * @param key - This is the key under which data is saved
   */
  async getBoolValue(key: string): Promise<boolean> {
    const value = await Storage.get({key});
    return value.value === 'true';
  }
  /**
   * To be used to get Number values from localstorage except objects.
   * @param key - This is the key under which data is saved
   */
  async getNumber(key: string): Promise<any> {
    const {value} = await Storage.get({key});
    return isNaN(+value) ? 0 : +value;
  }

  /**
   * To be used to get Objects from LocalStorage.
   * @param key - This is the key under which data is saved
   */
  async getObjValue(key: string): Promise<any> {
    const {value} = await Storage.get({key});
    return JSON.parse(value);
  }


  /**
   * To be used to get Remove values from localstorage.
   * @param key - This is the key under which data is saved
   */
  async delete(key: string): Promise<any> {
    await Storage.remove({key});
    return true;
  }

  /**
   * To set the js object in localstorage
   * @param key key of the object
   * @param obj Value of the object
   */
  async setObject(key, obj: any) {
    const value = JSON.stringify(obj);
    await Storage.set({key, value});
  }


}
