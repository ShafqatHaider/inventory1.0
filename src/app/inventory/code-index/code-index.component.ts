import { Component, OnInit } from '@angular/core';
import { InventoryConfigurations } from '../supportive/InventoryConfigurations';
import { Observables } from '../../shared/services/observers';
import { ModalService } from '../../shared/_components/modal/modal.service';
import { Modal } from 'bootstrap';
import { TransactionService } from '../supportive/services/transaction.service';

@Component({
  selector: 'app-code-index',
  templateUrl: './code-index.component.html',
  styleUrl: './code-index.component.scss'
})
export class CodeIndexComponent implements OnInit{
config= InventoryConfigurations.code;
constructor(private observer:Observables,private modalService:ModalService,private _trans:TransactionService){}
ngOnInit(): void {
  this.getAllCode()
}
getAllCode(){
  this.observer.getLookups(`${this.config.endpoints.getAll}`).subscribe((res=>{
    this.config.data=res;
  }))
}
add(){}
edit(){}
delete(param:any){
  if(confirm('Do you want to delete the recoed?'))
    this.observer.delete(`${this.config.endpoints.delete(param.companyId)}`).subscribe(res=>{alert('Recoed Deleted')})
  this.getAllCode()
}
}
