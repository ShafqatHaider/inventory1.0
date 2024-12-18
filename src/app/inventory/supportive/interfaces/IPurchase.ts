import { environment } from "../../../../environment/environment";

export class IPurchase {
        pMid:number=0;
        eDate:Date =new Date();
        billNo:string ='';
        sAccID:number =0;
        sAccName:string ='';
        biltyExp:number =0;
        goods:string ='';
        biltyNo:string ='';
        vehicleNo:string ='';
        freightExp:number=0;
        otherExp:number=0;
        constructorommissionExp:number =0;
        creditDays:number=0;
        agentID:number =0;
        commissionExp:number=0;
       contactNo:string ='';
        pandi:string ='';
        receiverID:number =0;
        remarks:string ='';
        companyID:number=environment.companyId;
        operatorID:number =environment.operatorID;
        branchID:number =environment.branchId;
        locationID:number =0;
        gSale:number =0;
        sReturn:number =0;
        discountUser:number =0;
        cashPay:number=0;
        stPartyId:number =0;
        stInvoiceNo:String ='';
        purchasesDetail: IPurchaseDetail[]= new Array();
    }

export class IPurchaseDetail {
    pMid:number =0;
    sSid:number =0;
    barcode:string ='';
    itemID:number =0;
    itemDescription:string ='';
    measureUnit:string ='';
    measureId:number =0;
     packet:number=0;
     pktQty:number=0;
    qty:number =0;
    purchaseRate:number =0;
    disRS:number =0;
    disPer:number=0;
    netRate:number =0;
    amount:number =0;
    strg:string ='';
    companyID:number =Number(localStorage.getItem('COMPANY_ID'));
    branchID:number =Number(localStorage.getItem('BRANCH_ID'));
    pTypeId:number =0;
    pType:string ='';
    n1:number=0;
    n2:number=0;
    n3:number=0;
    lotNo:string ='';
    txt1:string ='';
    txt2:string ='';
    txt3:string ='';
    saleTaxPercent:number =0;
    saleTaxAmount:number=0;
}