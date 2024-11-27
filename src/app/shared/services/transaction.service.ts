import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }



  calculateQty(obj:any){
    let qty=obj.pktQty*obj.qty;
    this.calculateSubAmount(qty,obj.amount)
    return qty;
  }
  calculateSubAmount(obj:any, amount:any){
    return amount*obj;
  }
  calculateAmount(obj:any){
    let amt=0
    for(let i=0; i<obj.length; i++){
      amt=obj[i].amount*(obj[i].pktQty*obj[i].packet);
    }
    return amt
  }

}
