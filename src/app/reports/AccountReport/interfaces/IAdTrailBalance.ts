export class IAdTrailBalance{
    adCateAcc:string='';
    debitSum:number=0;
    ceditSum:number=0;
    accounts: accounts[]= new Array();
}
export class accounts{
    eDate:number=0;
    saccId:number=0;
    title:string ='';
    debit:Date=new Date();
    credit:number=0
    companyId:number=0
    lastBillAmount:number=0
    lastBillDate:Date=new Date()
    lastPaymentAmount:number=0
    lastPaymentDate:Date=new Date()
}