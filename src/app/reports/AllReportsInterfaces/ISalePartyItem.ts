export class ISalePartyItem{
    sAccId:number=0;
    partyName:string='';
    totalPartyQty:number=0;
    totalPartyReturnQty:number=0;
    totalPartyMargin:number=0;
    Products=new Array<Products>();
}
export class Products{
    fcid:number=0;
    variety:string='';
    TotalCodeQty:number=0;
    totalCodeReturnQty:number=0;
    totalCodeMargin:number=0;
Bills=new Array<Bills>();

}
export class Bills{
    smId:number=0
    edate:Date=new Date();
    than:number=0
    qty:number=0
    rate:number=0
    discount:number=0
    amount:number=0
    margin:number=0
}