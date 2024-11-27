import { Component } from '@angular/core';

@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrl: './newaccount.component.scss'
})
export class NewaccountComponent {
  countries = [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'United Kingdom', code: 'UK' },
  ];

  cities = [
    { name: 'New York', id: 1 },
    { name: 'Toronto', id: 2 },
    { name: 'London', id: 3 },
  ];

  // Selected values
  selectedCountry: any;
  selectedCity: any;

  // Event handlers for selection changes
  onCountryChange(event: any): void {
    console.log('Selected Country:', event);
  }

  onCityChange(event: any): void {
    console.log('Selected City:', event);
  }
}

