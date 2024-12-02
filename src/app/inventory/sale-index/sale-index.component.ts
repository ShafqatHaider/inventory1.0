import { Component } from '@angular/core';
import { InventoryConfigurations } from '../supportive/InventoryConfigurations';
import { Observables } from '../../shared/services/observers';
import { ModalService } from '../../shared/_components/modal/modal.service';
import { TransactionService } from '../supportive/services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-index',
  templateUrl: './sale-index.component.html',
  styleUrl: './sale-index.component.scss'
})
export class SaleIndexComponent {
  config= InventoryConfigurations.sale;
  constructor(private observer:Observables,modalService:ModalService,_trans:TransactionService,public route:Router) {
  }
  
  ngOnInit(): void {
    this.getAllSale();
  }
  getAllSale(){
    this.observer.getLookups(`${this.config.endpoints.getAll}`).subscribe(res=>{
      this.config.data=res;
    })
  }
  
  add(){}
  edit = (sale: any) => {
    console.log('Sale ID:', this.config.model.sMid); // Debug log
    if (this.config.model.sMid) {
        this.route.navigate(['/inventory/sale-invoice/'+ this.config.model.sMid]); // Navigate with route
    } else {
        alert('Sale ID is missing!'); // Error handling
    }
};

  delete(){}
}
