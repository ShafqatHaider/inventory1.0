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
     
    this.route.navigate(['/inventory/saleinvoice/' + this.config.model.sMid]);

  };
  delete(){}
}
