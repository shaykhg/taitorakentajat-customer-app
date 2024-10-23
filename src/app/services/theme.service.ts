import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
/**
 * This service is used for all theming purposes
 * this service gets current selected theme from storage
 * It also sets active theme based on user selection automatically
 */
export class ThemeService {

  private renderer: Renderer2;
  private theme: BehaviorSubject<string>;
  public themeCur = 'blue-theme';
  dark = false;

  constructor(public platform: Platform, private storage: LocalStorageService, private rendererFactory2: RendererFactory2, @Inject(DOCUMENT) private document) {

    // Basic initialisations
    this.renderer = rendererFactory2.createRenderer(null, null);
    this.theme = new BehaviorSubject(this.themeCur);
    this.storage.getValue('theme').then(value => {
      if (value !== 'dark-theme'){
        this.themeCur = platform.is('desktop') ? value + '-desk' : value;
        this.theme = new BehaviorSubject(this.themeCur);
      } else {
        this.themeCur = value;
      }
      this.dark = this.themeCur === 'dark-theme';
      this.updateDarkMode(this.themeCur === 'dark-theme');
    });

    // This code is to handle the dark mode changes
    const prefersColor = window.matchMedia('(prefers-color-scheme: dark)');
    this.dark = prefersColor.matches;
    prefersColor.addEventListener(
        'change',
        mediaQuery => {
          this.dark = mediaQuery.matches;
          this.updateDarkMode(false);
        }
    );
  }
  /**
   * It is used to set the active theme of the app
   * @param val Name of the theme
   */
  setActiveTheme(val) {
    this.theme.next(val);
    this.themeCur = val;
    this.storage.setString('theme', val);
  }

  /**
   * It is used to get active theme of the app
   */
  getActiveTheme() {
    console.log(this.theme);
    return this.theme.asObservable();
  }

  /**
   * It is used to provide theme for Material Time Picker
   */
  getClockTheme(){
    switch (this.themeCur){
      case 'blue-theme' :
        return {};
      case '' :
        return {};
      case 'green-theme' :
        return  {
          container: {
            bodyBackgroundColor: '#fafafa',
            buttonColor: '#2E7D32'
          },
          dial: {
            dialActiveColor: '#fff',
            dialBackgroundColor: '#2E7D32'
          },
          clockFace: {
            clockFaceBackgroundColor: '#f0f0f0',
            clockHandColor: '#2E7D32',
            clockFaceTimeInactiveColor: '#424242'
          }
        };
      case 'red-theme' :
        return  {
          container: {
            bodyBackgroundColor: '#fafafa',
            buttonColor: '#f44336'
          },
          dial: {
            dialActiveColor: '#fff',
            dialBackgroundColor: '#f44336'
          },
          clockFace: {
            clockFaceBackgroundColor: '#f0f0f0',
            clockHandColor: '#f44336',
            clockFaceTimeInactiveColor: '#424242'
          }
        };
      case 'dark-theme' :
        return  {
          container: {
            bodyBackgroundColor: '#424242',
            buttonColor: '#fff'
          },
          dial: {
            dialBackgroundColor: '#555'
          },
          clockFace: {
            clockFaceBackgroundColor: '#555',
            clockHandColor: '#428cff',
            clockFaceTimeInactiveColor: '#fff'
          }
        };
    }
    return ;
  }

  /**
   *
   * To toggle the dark mode
   * @param dark It can be set to true or false to set dark mode on or off
   */
  updateDarkMode(dark: boolean) {
    if (dark){
      this.themeCur = 'dark-theme';
      this.renderer.addClass(document.body, 'darkMode');
      this.renderer.addClass(document.body, 'dark');
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'blue-theme');
      this.renderer.removeClass(document.body, 'green-theme');
      this.renderer.removeClass(document.body, 'red-theme');
    } else if (this.themeCur === 'green-theme'){
      console.log('this is theme cur*****', this.themeCur);
      this.renderer.removeClass(document.body, 'darkMode');
      this.renderer.removeClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'blue-theme');
      this.renderer.removeClass(document.body, 'red-theme');
      this.renderer.addClass(document.body, this.themeCur);
    } else if (this.themeCur === 'blue-theme'){
      console.log('this is theme cur*****', this.themeCur);
      this.renderer.removeClass(document.body, 'darkMode');
      this.renderer.removeClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'green-theme');
      this.renderer.removeClass(document.body, 'red-theme');
      this.renderer.addClass(document.body, this.themeCur);
    } else if (this.themeCur === 'red-theme'){
      console.log('this is theme cur*****', this.themeCur);
      this.renderer.removeClass(document.body, 'darkMode');
      this.renderer.removeClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'blue-theme');
      this.renderer.removeClass(document.body, 'green-theme');
      this.renderer.addClass(document.body, this.themeCur);
    } else {
      console.log('this is theme cur*****', this.themeCur);
      this.renderer.removeClass(document.body, 'darkMode');
      this.renderer.removeClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'blue-theme');
      this.renderer.removeClass(document.body, 'green-theme');
      this.renderer.removeClass(document.body, 'red-theme');
    }

    // document.body.classList.toggle('darkMode', dark);
  }
}
