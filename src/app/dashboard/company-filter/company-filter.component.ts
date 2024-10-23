import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {City} from '../../models/City';
import {DataShareService} from '../../services/data-share.service';
import {APIService} from '../../services/api.service';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import * as _ from 'lodash';
import {UtilService} from '../../services/util.service';
import {map, startWith} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss'],
})
export class CompanyFilterComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  cityCtrl = new FormControl();
  filteredCities: Observable<string[]>;
  @ViewChild('cityInput') cityInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor(private bottomSheetRef: MatBottomSheetRef<CompanyFilterComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public sheetData: any,
              private util: UtilService, private api: APIService, public data: DataShareService) { }

  ngOnInit() {
    console.log('Filters Called', this.sheetData);
    this.getCities();
  }

  /**
   * Called from language input box adding a new language
   * @param event MatChipInput event
   */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our city
    if ((value || '').trim()) {
      const val = _.find(this.data.cities, value);
      if (val) {
      this.data.filters.cities.push(value.trim());
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.cityCtrl.setValue(null);
  }

  /**
   * Called to remove the language
   * @param lang Name of the language
   */
  remove(lang: string): void {
    const index = this.data.filters.cities.indexOf(lang);

    if (index >= 0) {
      this.data.filters.cities.splice(index, 1);
    }
  }

  /**
   * This function is called when a language selected from list
   * @param event Event of selection
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    this.data.filters.cities.push(event.option.viewValue);
    this.cityInput.nativeElement.value = '';
    this.cityCtrl.setValue(null);
  }


  private getCities() {
    this.api.getAllCities().subscribe(data => {
      const cities = _.uniqBy(_.map(data, (c) => {
        const city = c;
        city.name = this.util.titleCase(city.name);
        return city;
      }), 'name');

      this.data.cities = _.map(cities, item => {
        return item.name;
      });

      this.filteredCities = this.cityCtrl.valueChanges.pipe(
        startWith(null),
        map((city: string | null) => city ? this._filter(city) : this.data.cities.slice()));
    });
  }


  /**
   * This is called to filter the city based on search
   * @param value
   * @private
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.data.cities.filter(city => city.toLowerCase().indexOf(filterValue) === 0);
  }

  clear() {
    this.bottomSheetRef.dismiss({filter: false, clear: true});
  }

  apply() {
    let params = new HttpParams();
    let sort = '';
    console.log(this.data.filters.cities, this.data.filters.price, this.data.filters.start, this.data.filters.end);
    if (this.data.filters.dateSort){
      sort = 'date:' + this.data.filters.dateSort + ',';
    }

    if (this.data.filters.priceSort){
      sort = sort + 'total:' + this.data.filters.priceSort;
    }

    if (sort.length > 0) {
    sort = sort.charAt(sort.length - 1) === ',' ? sort.slice(0, -1) : sort;
    params = params.append('_sort', sort);
    }

    if (this.data.filters.price){
      if (this.data.filters.price.lower > 0 && this.data.filters.price.upper){
        params = params.append('total_gte', String(this.data.filters.price.lower));
        params = params.append('total_lte', String(this.data.filters.price.upper));
      }
    }


    if (this.data.filters.start && this.data.filters.end){
      params = params.append('date_gte', this.data.filters.start.toISOString());
      params = params.append('date_lte', this.data.filters.end.toISOString());
    }

    if (this.data.filters.cities.length > 0){
      for (const city of this.data.filters.cities){
        params = params.append('city', city);
      }
    }

    console.log('Httparam ready', params.toString());
    // Close sheet and pass data
    this.bottomSheetRef.dismiss({filter: true, params});
  }

  close() {
    this.bottomSheetRef.dismiss({filter: false});
  }
}
