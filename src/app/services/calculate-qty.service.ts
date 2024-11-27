import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateQtyService {

  packetQty:number=0;
  packet:number=0;
  qty:any;
  constructor() { }
  calcQty(){
    this.qty=this.packetQty* this.packet;
  }
}
