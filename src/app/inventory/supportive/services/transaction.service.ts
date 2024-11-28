import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class TransactionService{
    constructor(){}

    onChangeItem(event: any, units: any[], details: any): any
    {
        details.barcode = event.barcode;
        details.itemID = event.itemID;
        details.itemDescription = event.itemDescription;
        details.rate = event.saleRate;
        details.cost =event.cost
    
        const mObj: any = units.find((e) => e.cid === event.measureId);
        if (mObj) {
          details.measureUnit = mObj.measurementName;
          details.measureId = mObj.cid;
        }
    
        return {
          updatedSSub: details,
          itemId: event.itemID,
        };
    }


}