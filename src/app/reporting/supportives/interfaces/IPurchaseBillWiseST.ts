export class IPurchaseBillWiseST{
    smId: number=0;
    eDate:Date=new Date();
    partyName:string='';
    
    totalBill: number=0;

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
    saleTaxAmount:number=0;
}

        
