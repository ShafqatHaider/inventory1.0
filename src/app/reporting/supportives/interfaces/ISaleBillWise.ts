export class ISaleBillWise{
    smId: number=0;
    partyName:string='';
    gsale:number=0;
    sreturn:number=0;
    discountuser:number=0
    totalBill: number=0;
    totalMargin:number=0;
    eDate:Date=new Date();
    bills = new Array<Bills>();

}
export class Bills{
    smId:number=0;
    edate:Date=new Date();
    fcId:number=0;
    itemName:string='';
    than:number=0;
    qty:number=0;
    rate:number=0;
    discount:number=0;
    amount:number=0;
    margin:number=0;
    saleType:string='';
}
    
