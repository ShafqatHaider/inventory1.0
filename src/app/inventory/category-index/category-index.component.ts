import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { Observables } from '../../shared/services/observers';
import { InventoryConfigurations } from '../supportive/InventoryConfigurations';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrl: './category-index.component.scss'
})
export class CategoryIndexComponent {
  config= InventoryConfigurations.category;
  /**
   *
   */
  constructor(private observer:Observables) {
    
    
  }
  
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.observer.getLookups(`${this.config.data}`)
  }
  add(){}
  edit(){}
  delete(){}
}
