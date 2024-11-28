export class ISaleItemParty{
    fcId:number=0; 
    variety:string='';
    totalCodeQty:number=0;
    totalCodeReturnQty:number=0;
    totalCodeMargin:number=0;
    party=new Array<Party>();
}
export class Party{
    sAccId:number=0;
    partyName:string='';
    TotalPartyQty:number=0;
    totalPartyReturnQty:number=0;
    totalPartyMargin:number=0;
    bills=new Array<Bills>();
}
export class Bills{
    smId:number=0;
    edate:Date=new Date();
    than:number=0;
    qty:number=0;
    rate:number=0;
    discount:number=0;
    amount:number=0;
    margin:number=0;
    remarks:string='';
    saleQty  :number=0;
    returnQty:number=0;
    netQty :number=0;
    saleAmt:number=0;
    returnAmt:number=0;
    netAmt :number=0;

}
            