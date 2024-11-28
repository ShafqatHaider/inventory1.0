import { Component } from '@angular/core';
import { InventoryConfigurations } from '../supportive/InventoryConfigurations';
import { SaleindexComponent } from '../saleindex/saleindex.component';
import { Observables } from '../../shared/services/observers';

@Component({
  selector: 'app-sale-index',
  templateUrl: './sale-index.component.html',
  styleUrl: './sale-index.component.scss'
})
export class SaleIndexComponent {
  config= InventoryConfigurations.sale;
  constructor(private observer:Observables) {
  }
  
  // ngOnInit(): void {
  //   this.getData();
  // }
  // getData(){
  //   this.observer.getLookups(`${this.config.endPoints.getAll}`)
  // }
  add(){}
  edit(){}
  delete(){}
}
