export class IPurchasePartyItem{
    sAccId:number=0;
    partyName:string='';
    totalPartyQty:number=0;
    totalPartyReturnQty:number=0;
    products=new Array<Products>();
}
export class Products{
fcid:number=0;
variety:string=''; 
saccId:number=0;  
totalCodeQty:number=0;
totalCodeReturnQty:number=0;  
bills=new Array<Bills>();

}
export class Bills{
    smId:number=0;
    eDate:Date=new Date();
    than:number=0;
    qty:number=0;
    rate:number=0;
    discount:number=0;
    amount:number=0;
    remarks:string='';
    purchaseQty:number=0;
    returnQty:number=0;
    netQty:number=0;
    purchaseAmt:number=0;
    returnAmt:number=0;
    netAmt:number=0;
    saleTaxAmount:number=0;
}