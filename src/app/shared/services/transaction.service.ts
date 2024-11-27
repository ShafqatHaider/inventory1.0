import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }



  calculateQty(obj:any){
    let qty=obj.pktQty*obj.qty;
    return qty;
  }
  calculateAmount(obj:any){
    let amt=0
    for(let i=0; i<obj.length; i++){
      amt=amt+obj[i].amount;
    }
    return amt
  }

}
