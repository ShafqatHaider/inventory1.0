import { Component } from '@angular/core';
import { Observables } from '../../../shared/services/observers';
import { AccountConfigurations } from '../../supportives/AccountConfigurations';

@Component({
  selector: 'app-paymentindex',
  templateUrl: './paymentindex.component.html',
  styleUrl: './paymentindex.component.scss'
})
export class PaymentindexComponent {
  config= AccountConfigurations.payment;
  constructor(private observer:Observables) {
  }
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.observer.getLookups(`${this.config.endPoints.getAll}`)
  }
  add(){}
  edit(){}
  delete(){}
}
